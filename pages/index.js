import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const { toast } = useToast();
  const [state, setState] = useState({
    apiKey: "",
    to: [],
    from: "",
    subject: "",
    body: "",
  });
  const sendEmail = () => {
    fetch("/api/email", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res) {
          if (res["error"]) {
            toast({
              title:
                "Oops! We had the following error while sending the email:",
              description: res.error,
            });
          } else {
            if (res.data.message) {
              toast({
                description: res.data.message,
              });
            } else {
              toast({
                title: "Sent Succesfully!",
                description: `Your event ID for this email would be: ${res.data.id}`,
              });
            }
          }
        }
      });
  };
  return (
    <div className="flex flex-col w-full items-center">
      <div className="mt-3 grid w-full max-w-sm items-center gap-1.5">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Resend Visually
        </h1>
        <Label className="mt-5" htmlFor="resend-api-key">
          Resend API Key
        </Label>
        <Input
          onChange={(e) => {
            setState((lastState) => ({
              ...lastState,
              apiKey: e.target.value,
            }));
          }}
          type="text"
          id="resend-api-key"
          placeholder="re_123456789"
        />
      </div>
      <div className="mt-3 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">From</Label>
        <Input
          onChange={(e) => {
            setState((lastState) => ({
              ...lastState,
              from: e.target.value,
            }));
          }}
          type="text"
          id="email"
          placeholder="Rishi Raj Jain <apply@rishi.app>"
        />
      </div>
      <div className="mt-3 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="to">To</Label>
        <Input
          onChange={(e) => {
            setState((lastState) => ({
              ...lastState,
              to: e.target.value.split(",").map((i) => i.trim()),
            }));
          }}
          type="text"
          id="to"
          placeholder="Set of emails sepeated by comma"
        />
      </div>
      <div className="mt-3 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Input
          onChange={(e) => {
            setState((lastState) => ({
              ...lastState,
              subject: e.target.value,
            }));
          }}
          type="text"
          id="subject"
          placeholder="Rishi Raj Jain - Developer Success Engineer"
        />
      </div>
      <div className="mt-3 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="body">Body</Label>
        <Input
          onChange={(e) => {
            setState((lastState) => ({
              ...lastState,
              body: e.target.value,
            }));
          }}
          id="body"
          type="text"
          placeholder="I'm super stoked to be meeting with you, Jonni."
        />
      </div>
      <div className="mt-3 grid w-full max-w-sm items-center gap-1.5">
        <Button className="mt-3" onClick={sendEmail} variant="outline">
          Send Email{state.to.length > 0 && "s"} &rarr;
        </Button>
      </div>
    </div>
  );
};

export default Home;
