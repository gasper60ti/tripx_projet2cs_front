"use client"

import { addTravelAgency } from "@/actions/agency"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import ImageFormControl from "../../../../components/ui/custom/image-input"
import { Save } from "lucide-react"
import { AddTravelAgencySchema } from "@/lib/schemas/agency"
import { AddTravelAgencySchemaType } from "@/lib/types/agency"

export default function AddTravelAgencyForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues
  } = useForm<AddTravelAgencySchemaType>({ resolver: zodResolver(AddTravelAgencySchema) })

  const AddTravelAgencyMutation = {
    mutationFn: addTravelAgency,
    onSuccess: async (data: any) => {
      toast.success(data.message)
      router.push("/travel-agencies")
    },
    onError: (error: any) => {
      toast.error(error.response.data.message)
    }
  }
  useEffect(() => {
    console.log("errors", errors)
  }, [errors])

  const mutation = useMutation(AddTravelAgencyMutation)
  const { isPending } = mutation

  const onSubmit: SubmitHandler<AddTravelAgencySchemaType> = (data) => {
    const newData = {
      ...data,
      // rating: data.rating.toString(),
      social_media: data.social_media
    }
    mutation.mutate(newData as unknown as AddTravelAgencySchemaType)
  }

  const [logo, setLogo] = useState<File | null>(null)

  // const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0] || null
  //   setLogo(file)
  // }
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setLogo(file)
    if (file) {
      const url = URL.createObjectURL(file)
      setLogoUrl(url)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 py-8 lg:px-16">
      <h1 className="mx-12 text-3xl font-black leading-none tracking-tight ">Add a new Travel Agency to TripX</h1>
      <div className="mx-12 my-6 flex justify-between gap-12 rounded-lg bg-[#FCFCFC] p-6">
        <ImageFormControl
          //@ts-ignore
          imageState={watch("logo")}
          label={"logo"}
          //@ts-ignore
          register={register("logo")}
          setValue={(s) =>
            //@ts-ignore
            setValue("logo", s, {
              shouldDirty: true,
              shouldValidate: true
            })
          }
          error={""}
        />

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
            <label className={`${errors.description && "text-red-500"} text-sm font-semibold`} htmlFor="zip_code">
              Description
            </label>
            <Input
              id="description"
              className={` ${errors.description && "border-red-500"}`}
              placeholder="Enter a short description for your work"
              {...register("description")}
            />
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

          <div className="mt-6 flex items-center justify-end gap-4">
            <Link href={"/travel-agencies"}>
              <Button variant={"outline"}>Discard</Button>
            </Link>
            <Button disabled={mutation.isPending} variant="primary" type="submit">
              <Save className="mr-1 h-6 w-6" />
              {isPending ? <Spinner /> : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
