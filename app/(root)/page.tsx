

import { CreditInfoTable } from "@/components/shared/CreditTable";
import { mockData } from "@/constants/mockData";
import { UserButton } from "@clerk/nextjs";
 
export default function Home() {
  return (
    <>
      <CreditInfoTable data={mockData} />   
    </>
  )
}