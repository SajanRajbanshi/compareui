"use client";

import React, { useState } from "react";
import { 
  Button as MuiButton, 
  Dialog as MuiDialog, 
  DialogTitle as MuiDialogTitle, 
  DialogContent as MuiDialogContent, 
  DialogContentText as MuiDialogContentText, 
  DialogActions as MuiDialogActions 
} from "@mui/material";
import { 
  Button as ChakraButton,
  Dialog as ChakraDialog,
  Text as ChakraText
} from "@chakra-ui/react";
import { Button as AntButton, Modal as AntModal } from "antd";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { ProviderType } from "@/components/Providers";
import { AnimatePresence, motion } from "framer-motion";

interface ModalConfig {
  title: string;
  content: string;
  styles?: {
    borderRadius?: number;
    backgroundColor?: string;
    titleColor?: string;
    textColor?: string;
    overlayColor?: string;
    borderColor?: string;
  };
}

interface ModalWrapperProps {
  provider: ProviderType;
  config: ModalConfig;
}

export default function ModalWrapper({
  provider,
  config,
}: ModalWrapperProps) {
  // MUI State
  const [muiOpen, setMuiOpen] = useState(false);
  
  // Chakra State
  const [chakraOpen, setChakraOpen] = useState(false);
  
  // Antd State
  const [isAntModalOpen, setIsAntModalOpen] = useState(false);

  // Aceternity State
  const [isAceternityOpen, setIsAceternityOpen] = useState(false);

  const {
    borderRadius,
    backgroundColor,
    titleColor,
    textColor,
    overlayColor,
    borderColor
  } = config.styles || {};

  switch (provider) {
    case "mui":
      return (
        <>
          <MuiButton variant="contained" onClick={() => setMuiOpen(true)}>
            Open Modal
          </MuiButton>
          <MuiDialog
            open={muiOpen}
            onClose={() => setMuiOpen(false)}
            PaperProps={{
              sx: {
                ...(backgroundColor && { bgcolor: backgroundColor }),
                ...(borderRadius !== undefined && { borderRadius: `${borderRadius}px` }),
                ...(borderColor && { border: `1px solid ${borderColor}` }),
              }
            }}
          >
            <MuiDialogTitle sx={{ ...(titleColor && { color: titleColor }) }}>
              {config.title}
            </MuiDialogTitle>
            <MuiDialogContent>
              <MuiDialogContentText sx={{ ...(textColor && { color: textColor }) }}>
                {config.content}
              </MuiDialogContentText>
            </MuiDialogContent>
            <MuiDialogActions>
              <MuiButton onClick={() => setMuiOpen(false)}>Close</MuiButton>
            </MuiDialogActions>
          </MuiDialog>
        </>
      );

    case "chakra":
      return (
        <ChakraDialog.Root open={chakraOpen} onOpenChange={(e) => setChakraOpen(e.open)}>
          <ChakraDialog.Trigger asChild>
            <ChakraButton colorScheme="teal" variant="solid">Open Modal</ChakraButton>
          </ChakraDialog.Trigger>
          <ChakraDialog.Backdrop bg={overlayColor} />
          <ChakraDialog.Positioner>
            <ChakraDialog.Content 
              bg={backgroundColor} 
              borderRadius={borderRadius !== undefined ? `${borderRadius}px` : undefined}
              borderColor={borderColor}
              borderWidth={borderColor ? "1px" : undefined}
            >
              <ChakraDialog.Header color={titleColor}>
                <ChakraDialog.Title>{config.title}</ChakraDialog.Title>
                <ChakraDialog.CloseTrigger />
              </ChakraDialog.Header>
              <ChakraDialog.Body>
                <ChakraText color={textColor}>{config.content}</ChakraText>
              </ChakraDialog.Body>

              <ChakraDialog.Footer>
                <ChakraButton colorPalette="blue" onClick={() => setChakraOpen(false)}>
                  Close
                </ChakraButton>
              </ChakraDialog.Footer>
            </ChakraDialog.Content>
          </ChakraDialog.Positioner>
        </ChakraDialog.Root>
      );

    case "antd":
      return (
        <>
          <AntButton type="primary" onClick={() => setIsAntModalOpen(true)}>
            Open Modal
          </AntButton>
          <AntModal 
            title={<span style={{ color: titleColor }}>{config.title}</span>}
            open={isAntModalOpen} 
            zIndex={2000}
            onOk={() => setIsAntModalOpen(false)} 
            onCancel={() => setIsAntModalOpen(false)}
            styles={{
               body: {
                 ...(backgroundColor && { backgroundColor }),
                 ...(borderRadius !== undefined && { borderRadius: `${borderRadius}px` }),
                 ...(borderColor && { border: `1px solid ${borderColor}` }),
               },
               mask: overlayColor ? { backgroundColor: overlayColor } : undefined,
               header: titleColor ? { color: titleColor, background: 'transparent' } : undefined,
            }}
          >
            <p style={{ color: textColor }}>{config.content}</p>
          </AntModal>
        </>
      );

    case "shadcn":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Modal</Button>
          </DialogTrigger>
          <DialogContent style={{
             ...(backgroundColor && { backgroundColor }),
             ...(borderRadius !== undefined && { borderRadius: `${borderRadius}px` }),
             ...(borderColor && { borderColor, borderWidth: '1px' }),
          }}>
            <DialogHeader>
              <DialogTitle style={{ ...(titleColor && { color: titleColor }) }}>{config.title}</DialogTitle>
              <DialogDescription style={{ ...(textColor && { color: textColor }) }}>
                {config.content}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

    case "aceternity":
      return (
        <div className="flex items-center justify-center">
          <button 
            onClick={() => setIsAceternityOpen(true)}
            className="px-4 py-2 rounded-md border border-neutral-600 text-neutral-600 bg-white hover:bg-gray-100 transition duration-200"
          >
            Open Modal
          </button>

          <AnimatePresence>
            {isAceternityOpen && (
              <div className="fixed inset-0 z-[2000] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                  style={{ backgroundColor: overlayColor }}
                  onClick={() => setIsAceternityOpen(false)}
                />
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="relative w-auto max-w-3xl mx-auto my-6 z-50 p-6 bg-white rounded-lg shadow-lg"
                  style={{
                    ...(backgroundColor && { backgroundColor }),
                    ...(borderRadius !== undefined && { borderRadius: `${borderRadius}px` }),
                    ...(borderColor && { border: `1px solid ${borderColor}` }),
                  }}
                >
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: titleColor }}>
                    {config.title}
                  </h3>
                  <p className="relative text-gray-600 text-lg leading-relaxed" style={{ color: textColor }}>
                    {config.content}
                  </p>
                  <div className="flex items-center justify-end mt-6">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setIsAceternityOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      );

    default:
      return (
        <div className="text-red-500 italic text-xs">
          Provider {provider} not found
        </div>
      );
  }
}
