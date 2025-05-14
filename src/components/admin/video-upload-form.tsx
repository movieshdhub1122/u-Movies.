// src/components/admin/video-upload-form.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCategories, addMockVideo, editMockVideo, type NewVideoData } from "@/lib/data";
import type { Video } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const videoFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().optional(),
  categoryId: z.string().min(1, { message: "Category is required." }),
  thumbnailUrl: z.string().url({ message: "Invalid URL format." }).optional().or(z.literal('')),
  videoFileUrl: z.string().url({ message: "Video URL must be a valid URL." }), // Using URL for simplicity
  sponsorTag: z.string().optional(),
  channelName: z.string().optional(),
  duration: z.string().regex(/^\d{1,2}:\d{2}(:\d{2})?$/, { message: "Duration must be in MM:SS or HH:MM:SS format." }).min(4, {message: "Duration is required."}),
  channelAvatarUrl: z.string().url({ message: "Invalid URL format." }).optional().or(z.literal('')),
});

type VideoFormValues = z.infer<typeof videoFormSchema>;

interface VideoUploadFormProps {
  existingVideo?: Video | null;
  onFormSubmit: (video: Video) => void;
  onCancel: () => void;
}

export function VideoUploadForm({ existingVideo, onFormSubmit, onCancel }: VideoUploadFormProps) {
  const { toast } = useToast();
  
  const defaultValues = React.useMemo(() => {
    if (existingVideo) {
      const category = mockCategories.find(c => c.name === existingVideo.category);
      return {
        title: existingVideo.title || "",
        description: existingVideo.description || "",
        categoryId: category?.id || "",
        thumbnailUrl: existingVideo.thumbnailUrl || "",
        videoFileUrl: "", // Video file URL might not be stored directly or needs specific handling for edit
        sponsorTag: existingVideo.sponsorTag || "",
        channelName: existingVideo.channelName || "",
        duration: existingVideo.duration || "0:00",
        channelAvatarUrl: existingVideo.channelAvatarUrl || "",
      };
    }
    return {
      title: "",
      description: "",
      categoryId: "",
      thumbnailUrl: "",
      videoFileUrl: "",
      sponsorTag: "",
      channelName: "",
      duration: "0:00",
      channelAvatarUrl: "",
    };
  }, [existingVideo]);

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues);
  }, [existingVideo, defaultValues, form]);


  const onSubmit = async (data: VideoFormValues) => {
    try {
      let submittedVideo: Video | undefined;
      const videoDataForSubmit: NewVideoData = {
        ...data,
        thumbnailUrl: data.thumbnailUrl || undefined,
        channelAvatarUrl: data.channelAvatarUrl || undefined,
      };

      if (existingVideo) {
        // Edit mode
        submittedVideo = editMockVideo(existingVideo.id, videoDataForSubmit);
        if (submittedVideo) {
          toast({ title: "Video Updated", description: `"${data.title}" has been updated.` });
        } else {
          throw new Error("Failed to update video.");
        }
      } else {
        // Create mode
        submittedVideo = addMockVideo(videoDataForSubmit);
        toast({ title: "Video Uploaded", description: `"${data.title}" has been added.` });
      }
      if (submittedVideo) {
        onFormSubmit(submittedVideo);
        form.reset( defaultValues); // Reset form to default values after successful submission
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "An error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter video title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter video description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                        {category.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="MM:SS or HH:MM:SS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="channelName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Channel Name (Optional)</FormLabel>
                <FormControl>
                    <Input placeholder="Enter channel name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
              control={form.control}
              name="channelAvatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Avatar URL (Optional)</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://example.com/avatar.jpg" {...field} />
                  </FormControl>
                  <FormDescription>Enter a URL for the channel's avatar.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>


        <FormField
          control={form.control}
          name="thumbnailUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail URL (Optional)</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com/thumbnail.jpg" {...field} />
              </FormControl>
               <FormDescription>Enter a URL for the video thumbnail. If left blank, a placeholder will be used.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoFileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video File URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com/video.mp4" {...field} />
              </FormControl>
              <FormDescription>Enter a URL for the video file (e.g., MP4, WebM).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sponsorTag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sponsor/Advertiser Tag (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter sponsor name or tag" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (existingVideo ? "Saving..." : "Uploading...") : (existingVideo ? "Save Changes" : "Upload Video")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
