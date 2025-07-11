
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Clock, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  id: string;
  title: string;
  description?: string;
  learnerCount: number;
  duration: string;
  topic?: string;
  status: 'draft' | 'published' | 'archived' | 'completed';
  imageUrl?: string;
  onClick: () => void;
}

const CourseCard = ({
  title,
  description,
  learnerCount,
  duration,
  topic,
  status,
  imageUrl,
  onClick
}: CourseCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-success-light text-success-dark border-success';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft':
        return 'bg-warning-light text-warning-dark border-warning';
      case 'archived':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-200 hover:shadow-hover hover:-translate-y-1 bg-card border-border"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        {imageUrl ? (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
            <img 
              src={imageUrl} 
              alt={title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        ) : (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-primary opacity-60" />
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <h3 className="font-heading font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              {description && (
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {description}
                </p>
              )}
            </div>
            <Badge 
              variant="outline" 
              className={cn("capitalize text-xs", getStatusColor(status))}
            >
              {status}
            </Badge>
          </div>
          
          {topic && (
            <Badge variant="secondary" className="text-xs">
              {topic}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{learnerCount} learners</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
