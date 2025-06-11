"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FormSchema = z.object({
  continent: z.string().min(1, "Please select a continent"),
})

export function PlaySettings() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      continent: "europe",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`/play?continent=${encodeURIComponent(data.continent)}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="continent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Continent</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a continent or All" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="america">America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Play</Button>
        {
          form.watch("continent") === "all" &&
          (<p className="text-sm text-destructive">
            <b>Warning:</b> &ldquo;All&rdquo; mode is very hard! Selecting a specific continent is strongly recommended.
          </p>)
        }
      </form>
    </Form>
  )
}

