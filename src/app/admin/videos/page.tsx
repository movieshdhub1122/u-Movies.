// src/app/admin/videos/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { mockVideos as initialMockVideos, mockCategories, addMockVideo, deleteMockVideo, editMockVideo } from "@/lib/data";
import type { Video, Category } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VideoUploadForm } from "@/components/admin/video-upload-form";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Edit3, Trash2, Eye, Video as VideoIconPlaceholder } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [videoToDelete, setVideoToDelete] = useState<Video | null>(null);

  const { toast } = useToast();

  const loadVideos = useCallback(() => {
     const sortedVideos = [...initialMockVideos].sort((a, b) => {
        const dateA = a.uploadDate ? new Date(a.uploadDate) : new Date(0); // Fallback for invalid dates
        const dateB = b.uploadDate ? new Date(b.uploadDate) : new Date(0); // Fallback for invalid dates
        
        // Check if dates are valid before comparing
        const timeA = !isNaN(dateA.getTime()) ? dateA.getTime() : 0;
        const timeB = !isNaN(dateB.getTime()) ? dateB.getTime() : 0;

        return timeB - timeA;
    });
    setVideos(sortedVideos);
  }, []);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const handleFormSubmit = (submittedVideo: Video) => {
    if (editingVideo) {
      // editMockVideo in data.ts already updates the mockVideos array directly
      editMockVideo(submittedVideo.id, submittedVideo);
    } else {
      // addMockVideo in data.ts already prepends to the mockVideos array
      // No need to call addMockVideo here if it's already called in the form
    }
    setIsFormOpen(false);
    setEditingVideo(null);
    loadVideos(); // Reload to reflect changes from mock data source
  };

  const openUploadForm = () => {
    setEditingVideo(null);
    setIsFormOpen(true);
  };

  const openEditForm = (video: Video) => {
    setEditingVideo(video);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (videoToDelete) {
      const success = deleteMockVideo(videoToDelete.id);
      if (success) {
        setVideos(prevVideos => prevVideos.filter(v => v.id !== videoToDelete.id));
        toast({ title: "Video Deleted", description: `"${videoToDelete.title}" has been removed.` });
      } else {
        toast({ title: "Error", description: "Could not delete video.", variant: "destructive" });
      }
      setVideoToDelete(null);
    }
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Manage Videos</h1>
        <Button onClick={openUploadForm}>
          <PlusCircle className="mr-2 h-5 w-5" /> Upload New Video
        </Button>
      </header>

      {videos.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead className="text-right w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video) => (
              <TableRow key={video.id}>
                <TableCell>
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    width={64}
                    height={36}
                    className="rounded object-cover aspect-video"
                    data-ai-hint="video thumbnail small"
                  />
                </TableCell>
                <TableCell className="font-medium">{video.title}</TableCell>
                <TableCell>
                  {video.category ? <Badge variant="secondary">{video.category}</Badge> : '-'}
                </TableCell>
                <TableCell>{video.duration || "-"}</TableCell>
                <TableCell>{video.views}</TableCell>
                <TableCell>{video.uploadDate || "-"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild className="mr-1">
                    <Link href={`/watch/${video.id}`} target="_blank" title="View Video">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEditForm(video)} title="Edit Video" className="mr-1">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" title="Delete Video" onClick={() => setVideoToDelete(video)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the video
                          "{videoToDelete?.title}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setVideoToDelete(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-10 border-2 border-dashed rounded-lg">
            <VideoIconPlaceholder className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold text-foreground">No videos found</h3>
            <p className="mt-1 text-sm text-muted-foreground">Get started by uploading a new video.</p>
            <div className="mt-6">
                <Button onClick={openUploadForm}>
                    <PlusCircle className="mr-2 h-5 w-5" /> Upload New Video
                </Button>
            </div>
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={(isOpen) => {
        setIsFormOpen(isOpen);
        if (!isOpen) setEditingVideo(null);
      }}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingVideo ? "Edit Video" : "Upload New Video"}</DialogTitle>
            <DialogDescription>
              {editingVideo ? "Modify the details of your video." : "Fill in the details for your new video."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <VideoUploadForm
              existingVideo={editingVideo}
              onFormSubmit={handleFormSubmit}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingVideo(null);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
