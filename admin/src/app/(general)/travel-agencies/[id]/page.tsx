"use client"

import { getTravelAgencyDetails, deleteTravelAgency, updateTravelAgency } from "@/actions/agency" // Adjust the import paths
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { Save, Trash2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { AddTravelAgencySchemaType } from "@/lib/types/agency"
import { AddTravelAgencySchema } from "@/lib/schemas/agency"
import ImageFormControl from "@/components/ui/custom/image-input"

export default function TravelAgencyDetails() {
  const router = useRouter()
  const searchParams = useParams()
  const agencyId = searchParams.id as string
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<AddTravelAgencySchemaType>({
    resolver: zodResolver(AddTravelAgencySchema)
  })

  const [isFetching, setIsFetching] = useState(true)
  const [logo, setLogo] = useState<File | null>(null)

  useEffect(() => {
    const fetchAgencyDetails = async () => {
      try {
        if (agencyId) {
          const data = await getTravelAgencyDetails(agencyId).then((res) => res.data)
          console.log("Fetched data:", data.name)
          setValue("name", data.name)
          setValue("description", data.description)
          setValue("contact_email", data.contact_email)
          setValue("phone", data.phone)
          setValue("address", data.address)
          setValue("logo", data.logo) // Populate the logo field
          setIsFetching(false)
        }
      } catch (error) {
        toast.error("Failed to fetch agency details.")
        setIsFetching(false)
      }
    }

    fetchAgencyDetails()
  }, [agencyId, setValue])

  const updateTravelAgencyMutation = useMutation({
    mutationFn: (updatedData: AddTravelAgencySchemaType) => updateTravelAgency(updatedData, agencyId!),
    onSuccess: (data) => {
      toast.success(data.message)
      router.push("/travel-agencies")
    },
    onError: (error: any) => {
      toast.error(error.response.data.message)
    }
  })

  const deleteTravelAgencyMutation = useMutation({
    mutationFn: () => deleteTravelAgency(agencyId!),
    onSuccess: (data) => {
      toast.success(data.message)
      router.push("/travel-agencies")
    },
    onError: (error: any) => {
      toast.error(error.response.data.message)
    }
  })

  const handleDelete = () => {
    if (agencyId) {
      deleteTravelAgencyMutation.mutate()
    }
  }

  const onSubmit: SubmitHandler<AddTravelAgencySchemaType> = (data) => {
    const updatedData = {
      ...data,
      social_media: data.social_media
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
            <label className={`${errors.description && "text-red-500"} text-sm font-semibold`} htmlFor="description">
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
            <Button variant={"destructive"} onClick={handleDelete}>
              <Trash2 className="mr-1 h-6 w-6" />
              {deleteTravelAgencyMutation.isPending ? <Spinner /> : "Delete agency"}
            </Button>
            <Button disabled={updateTravelAgencyMutation.isPending} variant="primary" type="submit">
              <Save className="mr-1 h-6 w-6" />
              {updateTravelAgencyMutation.isPending ? <Spinner /> : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
