import { Button } from "@/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert"


export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-3xl">Home
        <div className="flex flex-col w-full items-center justify-center gap-2">
          <Button variant="primary">Primary Button</Button>

          <Alert>
            <AlertTitle>Alert title</AlertTitle>
            <AlertDescription>
              Alert description
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </>
  );
}
