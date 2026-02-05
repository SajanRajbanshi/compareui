"use client";

import React from "react";
import { 
  Select as MuiSelect, 
  MenuItem as MuiMenuItem, 
  FormControl as MuiFormControl, 
  InputLabel as MuiInputLabel,
  Box as MuiBox
} from "@mui/material";
import { 
  Box as ChakraBox,
  Text as ChakraText,
  VStack as ChakraVStack,
  HStack as ChakraHStack,
  Icon as ChakraIcon,
  useDisclosure as useChakraDisclosure
} from "@chakra-ui/react";
import { ChevronDown, Check } from "lucide-react";
import { Select as AntSelect } from "antd";
import { 
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ProviderContext, ProviderType } from "@/components/Providers";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectConfig {
  options: (string | SelectOption)[];
  value: string;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  label?: string;
  styles?: {
    color?: string;
    backgroundColor?: string;
    borderRadius?: number | string;
    borderColor?: string;
  };
}

interface SelectWrapperProps {
  provider: ProviderType;
  config: SelectConfig;
  onChange?: (value: string) => void;
}

export default function SelectWrapper({
  provider,
  config,
  onChange,
}: SelectWrapperProps) {
  const { themeMode } = React.useContext(ProviderContext);
  const color = config.styles?.color;
  const placeholder = config.placeholder || "Select an option";
  
  const normalizedOptions: SelectOption[] = config.options.map(opt => 
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find(opt => opt.value === config.value);

  switch (provider) {
    case "mui":
      return (
        <MuiFormControl fullWidth size={config.size === 'small' ? 'small' : 'medium'} disabled={config.disabled}>
          {config.label && <MuiInputLabel id="mui-select-label">{config.label}</MuiInputLabel>}
          <MuiSelect
            labelId="mui-select-label"
            value={config.value}
            label={config.label}
            onChange={(e) => onChange?.(e.target.value)}
            sx={{ 
              ...(color ? { color } : {}), 
              '.MuiOutlinedInput-notchedOutline': { 
                borderColor: config.styles?.borderColor || color || undefined,
                borderRadius: config.styles?.borderRadius !== undefined ? `${config.styles.borderRadius}px` : undefined
              } 
            }}
          >
            {normalizedOptions.map((opt) => (
              <MuiMenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MuiMenuItem>
            ))}
          </MuiSelect>
        </MuiFormControl>
      );

    case "chakra":
      // Custom implementation for Chakra v3
      const { open, onToggle, onClose } = useChakraDisclosure();
      const chakraSize = config.size === 'small' ? 'sm' : config.size === 'large' ? 'lg' : 'md';
      
      return (
        <ChakraBox position="relative" width="full">
          {config.label && (
            <ChakraText mb={1} fontSize="sm" fontWeight="medium">
              {config.label}
            </ChakraText>
          )}
          <ChakraBox
            as="button"
            onClick={onToggle}
            {...({ disabled: config.disabled } as any)}
            width="full"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={4}
            py={2}
            borderRadius={config.styles?.borderRadius !== undefined ? `${config.styles.borderRadius}px` : "md"}
            border="1px solid"
            borderColor={config.styles?.borderColor || color || "gray.200"}
            bg={themeMode === 'dark' ? "gray.800" : "white"}
            opacity={config.disabled ? 0.5 : 1}
            cursor={config.disabled ? "not-allowed" : "pointer"}
            _hover={{ borderColor: config.styles?.borderColor || color || "gray.300" }}
          >
            <ChakraText color={config.value ? (color || "inherit") : "gray.400"}>
              {selectedOption?.label || placeholder}
            </ChakraText>
            <ChevronDown size={16} />
          </ChakraBox>
          
          {open && (
            <ChakraVStack
              position="absolute"
              top="100%"
              left={0}
              right={0}
              mt={1}
              zIndex={10}
              bg={themeMode === 'dark' ? "gray.800" : "white"}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              boxShadow="lg"
              align="stretch"
              py={1}
              overflowY="auto"
              maxH="200px"
            >
              {normalizedOptions.map((opt) => (
                <ChakraHStack
                  key={opt.value}
                  px={4}
                  py={2}
                  cursor="pointer"
                  _hover={{ bg: themeMode === 'dark' ? "gray.700" : "gray.50" }}
                  onClick={() => {
                    onChange?.(opt.value);
                    onClose();
                  }}
                  justifyContent="space-between"
                >
                  <ChakraText color={opt.value === config.value ? (color || "blue.500") : "inherit"}>
                    {opt.label}
                  </ChakraText>
                  {opt.value === config.value && <Check size={14} color={color || "#3182ce"} />}
                </ChakraHStack>
              ))}
            </ChakraVStack>
          )}
        </ChakraBox>
      );

    case "antd":
      return (
        <div style={{ width: '100%' }}>
          {config.label && <div style={{ marginBottom: 4, fontSize: 14 }}>{config.label}</div>}
          <AntSelect
            value={config.value}
            onChange={onChange}
            disabled={config.disabled}
            placeholder={placeholder}
            size={config.size === 'small' ? 'small' : config.size === 'large' ? 'large' : 'middle'}
            style={{ 
              width: '100%',
              borderRadius: config.styles?.borderRadius !== undefined ? `${config.styles.borderRadius}px` : undefined
            }}
            options={normalizedOptions}
          />
        </div>
      );

    case "shadcn":
      const shadcnSize = config.size === 'small' ? 'sm' : 'default';
      const shadcnColor = color || (themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)');
      
      return (
        <div className="w-full space-y-1">
          {config.label && <label className="text-sm font-medium">{config.label}</label>}
          <ShadcnSelect
            value={config.value}
            onValueChange={onChange}
            disabled={config.disabled}
          >
            <SelectTrigger 
              className="w-full" 
              // size={shadcnSize}
              style={{
                borderColor: config.styles?.borderColor || color,
                color: color,
                borderRadius: config.styles?.borderRadius !== undefined ? `${config.styles.borderRadius}px` : undefined
              }}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {normalizedOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </ShadcnSelect>
        </div>
      );

    case "aceternity":
      const [isOpenAceternity, setIsOpenAceternity] = React.useState(false);
      const dropdownRef = React.useRef<HTMLDivElement>(null);

      React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpenAceternity(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      const aceternityColor = color || '#3b82f6';

      return (
        <div className="w-full relative" ref={dropdownRef}>
          {config.label && (
            <label className="block text-sm font-semibold mb-1 opacity-80">
              {config.label}
            </label>
          )}
          <button
            type="button"
            disabled={config.disabled}
            onClick={() => !config.disabled && setIsOpenAceternity(!isOpenAceternity)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-2 rounded-xl transition-all duration-200 border-2",
              themeMode === 'dark' ? "bg-black/40 border-white/10" : "bg-white border-black/5",
              config.disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:border-white/20",
              isOpenAceternity && "ring-2 ring-primary/20 border-primary/50"
            )}
            style={{ 
              borderColor: config.styles?.borderColor || color,
              borderRadius: config.styles?.borderRadius !== undefined ? `${config.styles.borderRadius}px` : undefined
            }}
          >
            <span className={cn(
              "text-sm font-medium",
              !config.value && "opacity-50"
            )} style={color && config.value ? { color } : undefined}>
              {selectedOption?.label || placeholder}
            </span>
            <ChevronDown className={cn(
              "w-4 h-4 transition-transform duration-200",
              isOpenAceternity && "rotate-180"
            )} color={aceternityColor} />
          </button>

          {isOpenAceternity && (
            <div className={cn(
              "absolute z-50 top-full left-0 right-0 mt-2 rounded-2xl border overflow-hidden backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200",
              themeMode === 'dark' ? "bg-zinc-900/90 border-white/10" : "bg-white/90 border-black/10"
            )}>
              <div className="max-h-60 overflow-y-auto p-2">
                {normalizedOptions.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => {
                      onChange?.(opt.value);
                      setIsOpenAceternity(false);
                    }}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors duration-150",
                      opt.value === config.value 
                        ? (themeMode === 'dark' ? "bg-white/10" : "bg-black/5")
                        : "hover:bg-white/5"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-medium",
                      opt.value === config.value ? "text-primary" : (themeMode === 'dark' ? "text-zinc-400" : "text-zinc-600")
                    )} style={opt.value === config.value ? { color: aceternityColor } : undefined}>
                      {opt.label}
                    </span>
                    {opt.value === config.value && (
                      <Check className="w-3.5 h-3.5 text-primary" style={{ color: aceternityColor }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
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
