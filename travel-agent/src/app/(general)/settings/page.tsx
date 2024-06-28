"use client"
import { getTravelAgencyDetails, updateTravelAgency } from "@/api/travel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { Save } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { TravelAgencySchemaType } from "@/lib/types/agency"
import { TravelAgencySchema } from "@/lib/schemas/agency"
import ImageFormControl from "@/components/ui/custom/image-input"
import { getSession } from "@/actions/getSession"
import { updateSession } from "@/actions/updateSession"

export default function TravelAgencyDetails() {
  const router = useRouter()
  const [agency, setAgency] = useState<{
    _id: string
    name: string
    logo: string
    contact_email: string
    phone: string
    address: string
    social_media: Record<string, string>
    reviews_count: number
    is_complete: boolean
    description: string
    photos: string[]
  } | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession()
      if (session.agency) {
        setAgency(session.agency)
      }
    }

    fetchSession()
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<TravelAgencySchemaType>({
    resolver: zodResolver(TravelAgencySchema)
  })

  const [isFetching, setIsFetching] = useState(true)
  async function urlToFile(url: string, filename: string, mimeType: string) {
    const proxyUrl = "https://api.allorigins.win/raw?url="
    const res = await fetch(proxyUrl + url)
    const blob = await res.blob()
    const file = new File([blob], filename, { type: mimeType })
    return file
  }

  useEffect(() => {
    const fetchAgencyDetails = async () => {
      try {
        if (agency?._id) {
          const data = agency
          console.log("Fetched data:", data.name)
          setValue("name", data.name)
          setValue("description", data.description)
          setValue("contact_email", data.contact_email)
          setValue("phone", data.phone)
          setValue("address", data.address)
          // Fetch the logo file from the URL and set it as the value of the logo field
          urlToFile(data.logo, "logo.jpg", "image/jpeg").then((file) => {
            setValue("logo", file)
          })
          // Set photos
          const photoFiles = await Promise.all(
            data.photos.map((photo, i) => urlToFile(photo, `photo-${i}.jpg`, "image/jpeg"))
          )
          setValue("photos", photoFiles)
          setIsFetching(false)
        }
      } catch (error) {
        toast.error("Failed to fetch agency details.")
        setIsFetching(false)
      }
    }

    fetchAgencyDetails()
  }, [agency?._id, setValue])

  const updateTravelAgencyMutation = useMutation({
    mutationFn: (updatedData: TravelAgencySchemaType) => updateTravelAgency(updatedData, agency?._id!),
    onSuccess: async (data) => {
      const { user, accessToken } = await getSession()
      await updateSession({ user: user, accessToken: accessToken, agency: data.data })
      toast.success(data.message)
      router.push("/")
    },
    onError: (error: any) => {
      toast.error(error.response.data.message)
    }
  })

  const onSubmit: SubmitHandler<TravelAgencySchemaType> = (data) => {
    const updatedData = {
      ...data,
      photos: watch("photos"),
      social_media: JSON.stringify(data.social_media)
    }
    updateTravelAgencyMutation.mutate(updatedData)
  }

  if (isFetching) return <Spinner />

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 py-8 lg:px-16">
      <h1 className="mx-12 mb-4 text-3xl font-black leading-none tracking-tight">Travel Agency details</h1>
      <h2 className="mx-12 text-xl font-medium leading-none tracking-tight">
        Here you can see and edit this Travel agency information...
      </h2>
      {/* FORM CONTAINER */}
      <div className="mx-12 my-6 flex w-full flex-col gap-4 rounded-lg bg-[#FCFCFC] p-6">
        <div className="flex w-full justify-between gap-10">
          <div>
            <ImageFormControl
              imageState={watch("logo")}
              label={"logo"}
              register={register("logo")}
              setValue={(s) =>
                setValue("logo", s, {
                  shouldDirty: true,
                  shouldValidate: true
                })
              }
              error={errors.logo?.message || ""}
            />
          </div>
          <div className="flex w-[80%] flex-col justify-between gap-4">
            {/* Name */}
            <div>
              <label className={`${errors.name && "text-red-500"} text-sm font-semibold`} htmlFor="name">
                Travel Agency Name
              </label>
              <Input
                className={` ${errors.name && "border-red-500"}`}
                placeholder="Enter your Travel Agency Name"
                id="name"
                {...register("name")}
              />
              {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className={`${errors.description && "text-red-500"} text-sm font-semibold`} htmlFor="description">
                Description
              </label>
              <Input
                id="description"
                className={` ${errors.description && "border-red-500"}`}
                placeholder="Enter a short description for your work"
                {...register("description")}
              />
              {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
            </div>

            <div className="flex w-full justify-between gap-10">
              {/* Email */}
              <div className="w-full">
                <label
                  className={`${errors.contact_email && "text-red-500"} text-sm font-semibold`}
                  htmlFor="contact_email"
                >
                  Email
                </label>
                <Input
                  className={` ${errors.contact_email && "border-red-500"}`}
                  placeholder="Enter Your Email"
                  id="contact_email"
                  {...register("contact_email")}
                />
                {errors.contact_email && <span className="text-xs text-red-500">{errors.contact_email.message}</span>}
              </div>
              {/* PHONE */}
              <div className="w-full">
                <label className={`${errors.phone && "text-red-500"} text-sm font-semibold`} htmlFor="phone">
                  Phone
                </label>
                <Input
                  className={` ${errors.phone && "border-red-500"}`}
                  placeholder="Enter Phone Number"
                  id="phone"
                  {...register("phone")}
                />
                {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
              </div>
            </div>

            <div className="flex w-full justify-between gap-10">
              {/* ADDRESS */}
              <div className="w-full">
                <label className={`${errors.address && "text-red-500"} text-sm font-semibold`} htmlFor="address">
                  Address
                </label>
                <Input
                  id="address"
                  className={` ${errors.address && "border-red-500"}`}
                  placeholder="Enter Your Address"
                  {...register("address")}
                />
                {errors.address && <span className="text-xs text-red-500">{errors.address.message}</span>}
              </div>
            </div>
          </div>
        </div>
        {/* PHOTOS */}
        <label className={`${errors.photos && "text-red-500"} text-xl font-semibold`} htmlFor="photos">
          Agency photos
        </label>
        <div className="flex justify-between gap-8">
          {watch("photos")?.map((_, i) => (
            <ImageFormControl
              key={`photo-${i}`}
              imageState={watch(`photos.${i}`)}
              label={`photo-${i}`}
              register={register(`photos.${i}`)}
              setValue={(s) =>
                setValue(`photos.${i}`, s, {
                  shouldDirty: true,
                  shouldValidate: true
                })
              }
              error={errors.photos?.[i]?.message || ""}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <Button variant={"outline"} onClick={() => router.push("/")}>
            Discard
          </Button>
          <Button disabled={updateTravelAgencyMutation.isPending} variant="primary" type="submit">
            <Save className="mr-1 h-6 w-6" />
            {updateTravelAgencyMutation.isPending ? <Spinner /> : "Save"}
          </Button>
        </div>
      </div>
    </form>
  )
}
