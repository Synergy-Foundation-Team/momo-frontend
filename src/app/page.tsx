import { Button } from "@/ui/button";
export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-3xl gap-2">Home
        <div className="flex flex-col w-full items-center justify-center gap-2">
          <Button variant="outline">สั่งซื้อ</Button>
        </div>
        <div className="flex flex-col w-full items-center justify-center gap-2">
          <span>รายการสั่งซื้อ</span>
        </div>
      </div>
    </>
  );
}
