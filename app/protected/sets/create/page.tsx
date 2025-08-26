"use client";

import SetForm from "@/components/sets/SetForm";
import { useRouter } from "next/navigation";

export default function CreateSet() {
  const router = useRouter();
  return (
    <div>
      <SetForm set={null} setId={null} onCancelClick={() => {router.push("/protected/sets")}} setIsUpdating={null} from="create" />
    </div>
  );
}
