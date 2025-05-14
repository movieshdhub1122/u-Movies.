'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});


export default function AdvertisePage() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate form submission
    console.log('Ad inquiry:', values);
    toast({
      title: "Inquiry Sent!",
      description: "Thank you for your interest. We'll get back to you soon.",
    });
    form.reset();
  }


  const adPackages = [
    { name: 'Monthly Banner', price: '$200/month', features: ['Top banner placement', 'Category targeting'] },
    { name: 'Per Video Sponsorship', price: '$50/video', features: ['Mention in video', 'Logo in description'] },
    { name: 'Premium Package', price: '$500/month', features: ['All placements', 'Analytics report', 'Priority support'] },
  ];

  return (
    <div className="container mx-auto px-4 pt-4 pb-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Advertise with uMovies</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Reach a dedicated audience of film enthusiasts. Explore our advertising options to promote your brand or content.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Why Advertise With Us?</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <Card>
            <CardHeader><CardTitle>Targeted Audience</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">Connect with passionate movie lovers and cinephiles.</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>High Engagement</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">Our users actively watch, comment, and share content.</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Flexible Options</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">Choose from various ad formats and packages to suit your budget.</p></CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Sample Ad Placements</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-2">Top Banner Ad</h3>
            <Image src="https://picsum.photos/seed/adsample1/600/100" alt="Top Banner Ad Sample" width={600} height={100} className="rounded-lg shadow-md border" data-ai-hint="advertisement banner"/>
            <p className="text-sm text-muted-foreground mt-2">Prominently displayed at the top of pages for maximum visibility.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">In-Content Banner Ad</h3>
            <Image src="https://picsum.photos/seed/adsample2/600/100" alt="Inline Banner Ad Sample" width={600} height={100} className="rounded-lg shadow-md border" data-ai-hint="advertisement banner"/>
            <p className="text-sm text-muted-foreground mt-2">Placed between video rows or content sections for contextual relevance.</p>
          </div>
           <div>
            <h3 className="text-xl font-medium mb-2">Video Sponsorship Mention</h3>
             <div className="h-[100px] bg-muted rounded-lg shadow-md border flex items-center justify-center p-4" data-ai-hint="sponsorship placeholder">
                <p className="text-muted-foreground text-center">Sponsor logo & brief mention within video content or description.</p>
             </div>
            <p className="text-sm text-muted-foreground mt-2">Integrate your brand directly with specific videos or series.</p>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Our Ad Packages</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {adPackages.map((pkg) => (
            <Card key={pkg.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription className="text-accent font-semibold text-lg">{pkg.price}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {pkg.features.map(feature => <li key={feature}>{feature}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-6 text-center">Get in Touch</h2>
        <Card className="max-w-lg mx-auto shadow-xl">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Fill out the form below or contact us via WhatsApp to discuss your advertising needs.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about your advertising goals..." rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>
            </Form>
            <div className="mt-6 text-center">
              <Button variant="outline" asChild className="bg-green-500 hover:bg-green-600 text-white hover:text-white">
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"> {/* Replace with actual WhatsApp number */}
                  <WhatsAppIcon className="mr-2 h-5 w-5" /> Contact us on WhatsApp
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
