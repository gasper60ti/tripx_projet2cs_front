import Image from "next/image"
import error404 from "/public/images/dashboard/Error404.png"
export default function AddHikingAgency() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className=" text-5xl font-black text-blue-500">Sorry This feature is not available yet!</div>
      <Image src={error404} alt="404" className=" w-[60%]" />
    </div>
  )
}
