'use client'

import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileSpreadsheet, AlertCircle, Upload, Link, Info } from 'lucide-react';
import { Batch } from './BatchCard';

interface StudentBulkUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batches: Batch[];
  onUpload: (data: {
    file?: File;
    url?: string;
    batchId?: string;
    fileType: 'csv' | 'excel' | 'sheets';
  }) => Promise<void>;
}

const StudentBulkUploadModal = ({ 
  open, 
  onOpenChange, 
  batches,
  onUpload 
}: StudentBulkUploadModalProps) => {
  const [activeTab, setActiveTab] = useState<'file' | 'url'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  const [fileType, setFileType] = useState<'csv' | 'excel' | 'sheets'>('csv');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when modal closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedFile(null);
      setFileUrl('');
      setSelectedBatchId('');
      setFileType('csv');
      setError(null);
    }
    onOpenChange(open);
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      
      // Auto-detect file type
      if (file.name.endsWith('.csv')) {
        setFileType('csv');
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setFileType('excel');
      }
    }
  };

  // Handle URL input
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileUrl(e.target.value);
    setError(null);
    
    // Auto-detect Google Sheets URL
    if (e.target.value.includes('docs.google.com/spreadsheets')) {
      setFileType('sheets');
    }
  };

  // Handle upload
  const handleUpload = async () => {
    setError(null);
    setIsUploading(true);
    
    try {
      if (activeTab === 'file' && !selectedFile) {
        throw new Error('Please select a file to upload');
      }
      
      if (activeTab === 'url' && !fileUrl) {
        throw new Error('Please enter a valid URL');
      }
      
      await onUpload({
        file: activeTab === 'file' ? selectedFile! : undefined,
        url: activeTab === 'url' ? fileUrl : undefined,
        batchId: selectedBatchId || undefined,
        fileType
      });
      
      handleOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during upload');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Bulk Upload Students
          </DialogTitle>
          <DialogDescription>
            Upload multiple students at once using a spreadsheet file or URL.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Tabs defaultValue="file" value={activeTab} onValueChange={(value) => setActiveTab(value as 'file' | 'url')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload File
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                Google Sheets URL
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="file" className="space-y-4 pt-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="file-upload">Upload File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: CSV, Excel (.xlsx, .xls)
                </p>
              </div>
              
              {selectedFile && (
                <div className="flex items-center gap-2 text-sm">
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>{selectedFile.name}</span>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="url" className="space-y-4 pt-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="sheet-url">Google Sheets URL</Label>
                <Input
                  id="sheet-url"
                  type="url"
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  value={fileUrl}
                  onChange={handleUrlChange}
                />
                <p className="text-xs text-muted-foreground">
                  The Google Sheet must be publicly accessible or shared with view access
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file-type">File Type</Label>
            <Select value={fileType} onValueChange={(value) => setFileType(value as 'csv' | 'excel' | 'sheets')}>
              <SelectTrigger id="file-type">
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="sheets">Google Sheets</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="batch">Assign to Batch (Optional)</Label>
            <Select value={selectedBatchId} onValueChange={setSelectedBatchId}>
              <SelectTrigger id="batch">
                <SelectValue placeholder="Select a batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Batch</SelectItem>
                {batches.map((batch) => (
                  <SelectItem key={batch.id} value={batch.id}>
                    {batch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Alert variant="default" className="bg-muted/50">
            <Info className="h-4 w-4" />
            <AlertTitle>Required Format</AlertTitle>
            <AlertDescription className="text-xs">
              Your file should have columns for 'Name' and 'Email' (required). 
              Additional columns will be imported as student metadata.
            </AlertDescription>
          </Alert>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={isUploading || (activeTab === 'file' && !selectedFile) || (activeTab === 'url' && !fileUrl)}
          >
            {isUploading ? 'Uploading...' : 'Upload Students'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentBulkUploadModal; 