import SetForm from "@/components/sets/SetForm";

export default async function CreateSet() {
  return (
    <div>
      <h1>Create a new Flashcard set here!</h1>
      <SetForm set={null} setId={null} setIsUpdating={null} from="create" />
    </div>
  );
}
