export const generateModalCode = (provider: string, config: any) => {
  const { title, content, styles } = config;
  
  const backgroundColor = styles?.backgroundColor;
  const borderColor = styles?.borderColor;
  const borderRadius = styles?.borderRadius;
  const titleColor = styles?.titleColor;
  const textColor = styles?.textColor; // Content text color
  const overlayColor = styles?.overlayColor;

  switch (provider) {
    case 'mui': {
      const paperSx: string[] = [];
      if (backgroundColor) paperSx.push(`bgcolor: '${backgroundColor}'`);
      if (borderRadius !== undefined) paperSx.push(`borderRadius: '${borderRadius}px'`);
      if (borderColor) paperSx.push(`border: '1px solid ${borderColor}'`);

      const titleSx: string[] = [];
      if (titleColor) titleSx.push(`color: '${titleColor}'`);

      const contentSx: string[] = [];
      if (textColor) contentSx.push(`color: '${textColor}'`);
      
      const paperProps = paperSx.length > 0 
        ? `\n      PaperProps={{\n        sx: {\n          ${paperSx.join(',\n          ')}\n        }\n      }}` 
        : '';

      return `import React from 'react';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions 
} from '@mui/material';

export function CustomModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}${paperProps}
      >
        <DialogTitle${titleSx.length > 0 ? ` sx={{ ${titleSx.join(', ')} }}` : ''}>
          ${title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText${contentSx.length > 0 ? ` sx={{ ${contentSx.join(', ')} }}` : ''}>
            ${content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}`;
    }

    case 'chakra': {
      const contentProps: string[] = [];
      if (backgroundColor) contentProps.push(`bg="${backgroundColor}"`);
      if (borderRadius !== undefined) contentProps.push(`borderRadius="${borderRadius}px"`);
      if (borderColor) {
        contentProps.push(`borderColor="${borderColor}"`);
        contentProps.push(`borderWidth="1px"`);
      }

      return `import {
  Dialog,
  Button,
  Text
} from '@chakra-ui/react';
import { useState } from 'react';

export function CustomModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Modal</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop ${overlayColor ? `bg="${overlayColor}" ` : ''}/>
      <Dialog.Positioner>
        <Dialog.Content${contentProps.length > 0 ? '\n          ' + contentProps.join('\n          ') : ''}>
          <Dialog.Header${titleColor ? ` color="${titleColor}"` : ''}>
            <Dialog.Title>${title}</Dialog.Title>
            <Dialog.CloseTrigger />
          </Dialog.Header>
          <Dialog.Body>
            <Text${textColor ? ` color="${textColor}"` : ''}>${content}</Text>
          </Dialog.Body>

          <Dialog.Footer>
            <Button onClick={() => setOpen(false)}>
              Close
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}`;
    }

    case 'antd': {
      const modalStyles: string[] = [];
      if (backgroundColor) modalStyles.push(`content: { backgroundColor: '${backgroundColor}' }`);
      if (borderRadius !== undefined) modalStyles.push(`content: { borderRadius: '${borderRadius}px' }`);
      // Antd modal styling is a bit complex via styles prop in v5
      
      const stylesProp = `styles={{
        ${backgroundColor || borderRadius !== undefined ? `body: { 
          ${backgroundColor ? `backgroundColor: '${backgroundColor}',` : ''}
          ${borderRadius !== undefined ? `borderRadius: '${borderRadius}px',` : ''}
          ${borderColor ? `border: '1px solid ${borderColor}',` : ''}
        },` : ''}
        ${overlayColor ? `mask: { backgroundColor: '${overlayColor}' },` : ''}
        ${titleColor ? `header: { color: '${titleColor}', background: 'transparent' },` : ''}
      }}`;

      return `import React, { useState } from 'react';
import { Button, Modal } from 'antd';

export function CustomModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal 
        title={<span${titleColor ? ` style={{ color: '${titleColor}' }}` : ''}>${title}</span>}
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        ${stylesProp}
      >
        <p${textColor ? ` style={{ color: '${textColor}' }}` : ''}>${content}</p>
      </Modal>
    </>
  );
}`;
    }

    case 'shadcn': {
      const contentClasses: string[] = [];
      const contentStyles: string[] = [];
      
      if (backgroundColor) contentStyles.push(`backgroundColor: '${backgroundColor}'`);
      if (borderRadius !== undefined) contentStyles.push(`borderRadius: '${borderRadius}px'`);
      if (borderColor) {
        contentStyles.push(`borderColor: '${borderColor}'`);
        contentStyles.push(`borderWidth: '1px'`);
      }

      return `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function CustomModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </DialogTrigger>
      <DialogContent style={{
        ${contentStyles.join(',\n        ')}
      }}>
        <DialogHeader>
          <DialogTitle${titleColor ? ` style={{ color: '${titleColor}' }}` : ''}>${title}</DialogTitle>
          <DialogDescription${textColor ? ` style={{ color: '${textColor}' }}` : ''}>
            ${content}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`;
    }

    case 'aceternity': {
        // Aceternity doesn't have a standard "Modal" component in the snippet style usually, 
        // effectively implementing a custom Framer Motion modal
        return `import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export function CustomModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="flex items-center justify-center">
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-md border border-neutral-600 text-neutral-600 bg-white hover:bg-gray-100 transition duration-200"
      >
        Open Modal
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              style={{ ${overlayColor ? `backgroundColor: '${overlayColor}'` : ''} }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-auto max-w-3xl mx-auto my-6 z-50 p-6 bg-white rounded-lg shadow-lg"
              style={{
                ${backgroundColor ? `backgroundColor: '${backgroundColor}',` : ''}
                ${borderRadius !== undefined ? `borderRadius: '${borderRadius}px',` : ''}
                ${borderColor ? `border: '1px solid ${borderColor}',` : ''}
              }}
            >
              <h3 className="text-2xl font-semibold mb-4" style={{ ${titleColor ? `color: '${titleColor}'` : ''} }}>
                ${title}
              </h3>
              <p className="relative text-gray-600 text-lg leading-relaxed" style={{ ${textColor ? `color: '${textColor}'` : ''} }}>
                ${content}
              </p>
              <div className="flex items-center justify-end mt-6">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setIsOpen(false)}
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
}`;
    }

    default:
      return "// Provider code not available";
  }
};
