"use client";

import React from "react";
import { 
  Card as MuiCard, 
  CardContent as MuiCardContent, 
  CardMedia as MuiCardMedia, 
  Typography as MuiTypography 
} from "@mui/material";
import { 
  Image as ChakraImage, 
  Text as ChakraText, 
  Heading as ChakraHeading,
  Card as ChakraCard 
} from "@chakra-ui/react";
import { Card as AntCard } from "antd";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../ui/card";
import { cn } from "@/lib/utils";
import { ProviderContext, ProviderType } from "../Providers";

const { Meta } = AntCard;

interface CardConfig {
  title: string;
  description: string;
  image?: boolean;
  styles?: {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    titleColor?: string;
    fontColor?: string;
    padding?: {
      px: number;
      py: number;
    };
    shadow?: 'none' | 'sm' | 'md' | 'lg';
  };
}

interface CardWrapperProps {
  provider: ProviderType;
  config: CardConfig;
}

export default function CardWrapper({
  provider,
  config,
}: CardWrapperProps) {
  const { themeMode } = React.useContext(ProviderContext);

  // Random placeholder image
  const imageUrl = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  const {
    backgroundColor,
    borderColor,
    borderWidth = 1,
    borderRadius,
    titleColor,
    fontColor,
    padding,
    shadow
  } = config.styles || {};

  const shadowMap = {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  };

  const currentShadow = shadow ? shadowMap[shadow] : undefined;

  switch (provider) {
    case "mui":
      return (
        <MuiCard sx={{ 
          maxWidth: 345,
          ...(backgroundColor && { bgcolor: backgroundColor }),
          ...(borderColor && { border: `${borderWidth}px solid ${borderColor}` }),
          ...(borderRadius !== undefined && { borderRadius: `${borderRadius}px` }),
          ...(currentShadow && { boxShadow: currentShadow }),
        }}>
          {config.image !== false && (
            <MuiCardMedia
              sx={{ height: 140 }}
              image={imageUrl}
              title={config.title}
            />
          )}
          <MuiCardContent sx={{ 
            ...(padding && { padding: `${padding.py}px ${padding.px}px` }) 
          }}>
            <MuiTypography gutterBottom variant="h5" component="div" sx={{ 
              ...(titleColor && { color: titleColor }) 
            }}>
              {config.title}
            </MuiTypography>
            <MuiTypography variant="body2" color="text.secondary" sx={{ 
              ...(fontColor && { color: fontColor }) 
            }}>
              {config.description}
            </MuiTypography>
          </MuiCardContent>
        </MuiCard>
      );

    case "chakra":
      return (
        <ChakraCard.Root 
          maxW="sm"
          bg={backgroundColor}
          borderColor={borderColor}
          borderWidth={borderColor ? `${borderWidth}px` : undefined}
          borderRadius={borderRadius !== undefined ? `${borderRadius}px` : undefined}
          boxShadow={shadow}
        >
          {config.image !== false && (
            <ChakraCard.Body p={0}>
              <ChakraImage
                src={imageUrl}
                alt={config.title}
                borderTopRadius={borderRadius !== undefined ? `${borderRadius}px` : undefined}
                objectFit="cover"
                h="140px"
                w="100%"
              />
            </ChakraCard.Body>
          )}
          <ChakraCard.Body p={padding ? `${padding.py}px ${padding.px}px` : 4}>
            <ChakraHeading size="md" mb={2} color={titleColor}>
              {config.title}
            </ChakraHeading>
            <ChakraText color={fontColor}>
              {config.description}
            </ChakraText>
          </ChakraCard.Body>
        </ChakraCard.Root>
      );

    case "antd":
      return (
        <AntCard
          hoverable
          style={{ 
            width: 300,
            ...(backgroundColor && { backgroundColor }),
            ...(borderColor && { borderColor, borderStyle: 'solid', borderWidth: `${borderWidth}px` }),
            ...(borderRadius !== undefined && { borderRadius: `${borderRadius}px` }),
            ...(currentShadow && { boxShadow: currentShadow }),
          }}
          cover={config.image !== false ? <img alt={config.title} src={imageUrl} style={{ height: 140, objectFit: 'cover', borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }} /> : null}
          styles={{
            body: {
              ...(padding && { padding: `${padding.py}px ${padding.px}px` })
            }
          }}
        >
          <Meta 
            title={<span style={{ color: titleColor }}>{config.title}</span>} 
            description={<span style={{ color: fontColor }}>{config.description}</span>} 
          />
        </AntCard>
      );

    case "shadcn":
      return (
        <Card className={cn("w-[350px]", shadow && `shadow-${shadow}`)} style={{
          ...(backgroundColor && { backgroundColor }),
          ...(borderColor && { borderColor, borderWidth: `${borderWidth}px` }),
          ...(borderRadius !== undefined && { borderRadius: `${borderRadius}px` }),
        }}>
          {config.image !== false && (
            <div className="w-full h-[140px] overflow-hidden rounded-t-[inherit]">
               <img src={imageUrl} alt={config.title} className="w-full h-full object-cover" />
            </div>
          )}
          <CardHeader style={{ ...(padding && { padding: `${padding.py}px ${padding.px}px ${padding.py/2}px` }) }}>
            <CardTitle style={{ ...(titleColor && { color: titleColor }) }}>{config.title}</CardTitle>
          </CardHeader>
          <CardContent style={{ ...(padding && { padding: `${padding.py/2}px ${padding.px}px ${padding.py}px` }) }}>
            <CardDescription style={{ ...(fontColor && { color: fontColor }) }}>
              {config.description}
            </CardDescription>
          </CardContent>
        </Card>
      );

    case "aceternity":
      return (
        <div 
          className="max-w-xs w-full group/card"
        >
          <div 
            className={cn(
              " cursor-pointer overflow-hidden relative card h-96 rounded-xl shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4",
              "transition-all duration-300 hover:shadow-2xl"
            )}
            style={{
              ...(backgroundColor ? { backgroundColor } : { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }),
              ...(borderColor && { border: `${borderWidth}px solid ${borderColor}` }),
              ...(borderRadius !== undefined && { borderRadius: `${borderRadius}px` }),
            }}
          >
            <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
            <div className="flex flex-row items-center space-x-4 z-10">
               {/* Optional header content */}
            </div>
            <div className="text content z-10">
              <h1 
                className="font-bold text-xl md:text-2xl text-gray-50 relative z-10"
                style={{ ...(titleColor && { color: titleColor }) }}
              >
                {config.title}
              </h1>
              <p 
                className="font-normal text-sm text-gray-50 relative z-10 my-4"
                style={{ ...(fontColor && { color: fontColor }) }}
              >
                {config.description}
              </p>
            </div>
          </div>
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
