"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SigningProps {
  open: boolean;
  confirmHandler: () => void;
  handleClose: () => void;
}

function SigningDialog({ open, handleClose, confirmHandler }: SigningProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px] bg-[#fff] dark:bg-[#1F1F1F] text-card-foreground">
        <DialogHeader>
          <DialogTitle>Link Wallet</DialogTitle>
          <DialogDescription>
            This is the signature request signing is free and will not send a
            transaction.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-evenly gap-4 py-4">
          <Button
            variant="secondary"
            className="bg-muted/40 w-[40%] text-muted-foreground hover:bg-muted/60"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="rounded-[8px] w-[40%] h-[40px] text-[#000] bg-gradient-to-r from-[#4599FF] to-[#04FEAE] "
            onClick={confirmHandler}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SigningDialog;
