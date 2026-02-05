"use client";

import React, { useState } from "react";
import { 
  Tabs as MuiTabs, 
  Tab as MuiTab, 
  Box as MuiBox, 
  Typography as MuiTypography 
} from "@mui/material";
import { Tabs as ChakraTabs } from "@chakra-ui/react";
import { Tabs as AntTabs } from "antd";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils";
import { ProviderType } from "@/components/Providers";
import { motion } from "framer-motion";

interface TabItem {
  label: string;
  value: string;
  content: string;
}

interface TabsConfig {
  tabs: TabItem[];
  defaultValue: string;
  orientation?: 'horizontal' | 'vertical';
  styles?: {
    activeColor?: string;
    inactiveColor?: string;
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
  };
}

interface TabsWrapperProps {
  provider: ProviderType;
  config: TabsConfig;
}

function MuiTabPanel(props: { children?: React.ReactNode; index: string; value: string }) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <MuiBox sx={{ p: 3 }}>
          <MuiTypography component="div">{children}</MuiTypography>
        </MuiBox>
      )}
    </div>
  );
}

export default function TabsWrapper({
  provider,
  config,
}: TabsWrapperProps) {
  const { tabs, defaultValue, orientation = 'horizontal', styles } = config;
  const { activeColor, inactiveColor, backgroundColor, borderRadius, padding } = styles || {};

  // MUI State
  const [muiValue, setMuiValue] = useState(defaultValue);

  // Chakra State - handled internally or via defaultIndex? 
  // Chakra uses index (number) primarily in v2, but v3? v3 likely root/trigger. 
  // Let's assume standard Tabs for now.

  const [aceternityActive, setAceternityActive] = useState<string>(defaultValue);

  switch (provider) {
    case "mui":
      return (
        <MuiBox sx={{ width: '100%' }}>
          <MuiBox sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <MuiTabs 
              value={muiValue} 
              onChange={(_, v) => setMuiValue(v)} 
              orientation={orientation}
              sx={{
                ...(backgroundColor && { bgcolor: backgroundColor }),
                ...(borderRadius !== undefined && { borderRadius: `${borderRadius}px` }),
                ...(padding !== undefined && { p: padding * 0.25 }),
                // Ensure tabs wrap or scroll if needed
                '& .MuiTabs-flexContainer': {
                  gap: 1
                }
              }}
              TabIndicatorProps={{
                style: { backgroundColor: activeColor || undefined }
              }}
            >
              {tabs.map((tab) => (
                <MuiTab 
                  key={tab.value} 
                  label={tab.label} 
                  value={tab.value} 
                  sx={{
                    '&.Mui-selected': activeColor ? { color: activeColor } : {},
                    color: inactiveColor,
                    zIndex: 1
                  }}
                />
              ))}
            </MuiTabs>
          </MuiBox>
          {tabs.map((tab) => (
            <MuiTabPanel key={tab.value} value={muiValue} index={tab.value}>
              <div style={{ wordBreak: 'break-word', whiteSpace: 'normal', maxWidth: '100%' }}>
                {tab.content}
              </div>
            </MuiTabPanel>
          ))}
        </MuiBox>
      );

    case "chakra":
      const defaultIndex = tabs.findIndex(t => t.value === defaultValue);
      return (
        <div style={{ width: '100%' }}>
          <ChakraTabs.Root 
            defaultValue={defaultValue} 
            orientation={orientation} 
            variant="enclosed"
            fitted={orientation !== 'vertical'}
          >
            <ChakraTabs.List 
              bg={backgroundColor} 
              borderRadius={borderRadius !== undefined ? `${borderRadius}px` : undefined}
              p={padding}
            >
              {tabs.map((tab) => (
                <ChakraTabs.Trigger 
                  key={tab.value}
                  value={tab.value}
                  _selected={{ 
                    color: activeColor || 'blue.500', 
                    borderColor: 'inherit', 
                    borderBottomColor: 'transparent',
                    fontWeight: 'bold'
                  }}
                  color={inactiveColor}
                >
                  {tab.label}
                </ChakraTabs.Trigger>
              ))}
            </ChakraTabs.List>

            <ChakraTabs.ContentGroup>
              {tabs.map((tab) => (
                <ChakraTabs.Content key={tab.value} value={tab.value}>
                  <div style={{ wordBreak: 'break-word', whiteSpace: 'normal', maxWidth: '100%' }}>
                    {tab.content}
                  </div>
                </ChakraTabs.Content>
              ))}
            </ChakraTabs.ContentGroup>
          </ChakraTabs.Root>
        </div>
      );

    case "antd":
      const items = tabs.map(tab => ({
        key: tab.value,
        label: tab.label,
        children: (
          <div style={{ wordBreak: 'break-word', whiteSpace: 'normal', maxWidth: '100%' }}>
            {tab.content}
          </div>
        ),
      }));
      return (
        <AntTabs 
          defaultActiveKey={defaultValue} 
          items={items} 
          tabPlacement={(orientation === 'vertical' ? 'left' : 'top') as any}
          tabBarStyle={{
            backgroundColor: backgroundColor,
            borderRadius: borderRadius !== undefined ? `${borderRadius}px` : undefined,
            padding: padding ? `${padding}px` : undefined,
          }}
        />
      );

    case "shadcn":
      // Vertical adaptation
      const isVertical = orientation === 'vertical';
      return (
        <Tabs 
          defaultValue={defaultValue} 
          orientation={orientation}
          className={cn(
            "w-full",
            isVertical ? "flex gap-6" : "flex flex-col"
          )}
        >
          <TabsList 
            className={cn(
              "grid",
               isVertical ? "flex flex-col h-auto w-48 justify-start" : `w-full grid-cols-${tabs.length}`
            )}
            style={{
              backgroundColor: backgroundColor,
              borderRadius: borderRadius !== undefined ? `${borderRadius}px` : undefined,
              padding: padding ? `${padding}px` : undefined,
              // Fallback for grid-cols if Tailwind doesn't generate
              ...(!isVertical && { gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` })
            }}
          >
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className={cn(isVertical ? "w-full justify-start" : "")}
                style={{
                  color: activeColor // Note: Shadcn active styling is mostly class/data-attr dependent
                }}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent 
              key={tab.value} 
              value={tab.value} 
              className={cn("mt-0 flex-1", isVertical ? "mt-0" : "mt-2")}
            >
              <div className="p-4 rounded-md border" style={{ wordBreak: 'break-word', whiteSpace: 'normal', maxWidth: '100%' }}>
                {tab.content}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      );

    case "aceternity":
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500 border-2 border-dashed rounded-xl">
          <p>Aceternity UI does not include a standard Tabs component.</p>
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
