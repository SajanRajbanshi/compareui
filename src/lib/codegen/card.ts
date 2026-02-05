export const generateCardCode = (provider: string, config: any) => {
  const { title, description, image, styles } = config;
  
  const backgroundColor = styles?.backgroundColor;
  const borderColor = styles?.borderColor;
  const borderWidth = styles?.borderWidth ?? 1;
  const borderRadius = styles?.borderRadius;
  const titleColor = styles?.titleColor;
  const fontColor = styles?.fontColor;
  const px = styles?.padding?.px;
  const py = styles?.padding?.py;
  const padding = styles?.padding;
  const shadow = styles?.shadow;

  const imageUrl = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  switch (provider) {
    case 'mui': {
      const sxProps: string[] = ['maxWidth: 345'];
      
      if (backgroundColor) sxProps.push(`bgcolor: '${backgroundColor}'`);
      if (borderColor) sxProps.push(`border: '${borderWidth}px solid ${borderColor}'`);
      if (borderRadius !== undefined) sxProps.push(`borderRadius: '${borderRadius}px'`);
      if (shadow) sxProps.push(`boxShadow: '${shadow === 'none' ? 'none' : '0 4px 6px rgba(0,0,0,0.1)'}'`); // Simplified shadow for generated code

      return `import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export function CustomCard() {
  return (
    <Card sx={{
      ${sxProps.join(',\n      ')}
    }}>
      ${image !== false ? `<CardMedia
        sx={{ height: 140 }}
        image="${imageUrl}"
        title="${title}"
      />` : ''}
      <CardContent${padding ? ` sx={{ padding: '${py}px ${px}px' }}` : ''}>
        <Typography gutterBottom variant="h5" component="div"${titleColor ? ` sx={{ color: '${titleColor}' }}` : ''}>
          ${title}
        </Typography>
        <Typography variant="body2" color="text.secondary"${fontColor ? ` sx={{ color: '${fontColor}' }}` : ''}>
          ${description}
        </Typography>
      </CardContent>
    </Card>
  );
}`;
    }

    case 'chakra': {
      const props: string[] = ['maxW="sm"'];
      if (backgroundColor) props.push(`bg="${backgroundColor}"`);
      if (borderColor) {
        props.push(`borderColor="${borderColor}"`);
        props.push(`borderWidth="${borderWidth}px"`);
      }
      if (borderRadius !== undefined) props.push(`borderRadius="${borderRadius}px"`);
      if (shadow) props.push(`boxShadow="${shadow}"`);

      return `import { Card, CardBody, Image, Stack, Heading, Text } from '@chakra-ui/react';

export function CustomCard() {
  return (
    <Card 
      ${props.join('\n      ')}
    >
      ${image !== false ? `<CardBody p={0}>
        <Image
          src="${imageUrl}"
          alt="${title}"
          borderTopRadius="${borderRadius !== undefined ? `${borderRadius}px` : 'md'}"
          objectFit="cover"
          h="140px"
          w="100%"
        />
      </CardBody>` : ''}
      <CardBody${padding ? ` p="${py}px ${px}px"` : ''}>
        <Heading size="md" mb={2}${titleColor ? ` color="${titleColor}"` : ''}>${title}</Heading>
        <Text${fontColor ? ` color="${fontColor}"` : ''}>
          ${description}
        </Text>
      </CardBody>
    </Card>
  );
}`;
    }

    case 'antd': {
      const styleProps: string[] = ['width: 300'];
      if (backgroundColor) styleProps.push(`backgroundColor: '${backgroundColor}'`);
      if (borderColor) {
        styleProps.push(`borderColor: '${borderColor}'`);
        styleProps.push(`borderStyle: 'solid'`);
        styleProps.push(`borderWidth: '${borderWidth}px'`);
      }
      if (borderRadius !== undefined) styleProps.push(`borderRadius: '${borderRadius}px'`);
      
      const bodyStyles: string[] = [];
      if (padding) bodyStyles.push(`padding: '${py}px ${px}px'`);

      return `import { Card } from 'antd';
const { Meta } = Card;

export function CustomCard() {
  return (
    <Card
      hoverable
      style={{
        ${styleProps.join(',\n        ')}
      }}
      ${image !== false ? `cover={<img alt="${title}" src="${imageUrl}" style={{ height: 140, objectFit: 'cover' }} />}` : ''}
      ${bodyStyles.length > 0 ? `styles={{ body: { ${bodyStyles.join(', ')} } }}` : ''}
    >
      <Meta 
        title={<span${titleColor ? ` style={{ color: '${titleColor}' }}` : ''}>${title}</span>} 
        description={<span${fontColor ? ` style={{ color: '${fontColor}' }}` : ''}>${description}</span>} 
      />
    </Card>
  );
}`;
    }

    case 'shadcn': {
      const styleProps: string[] = [];
      if (backgroundColor) styleProps.push(`backgroundColor: '${backgroundColor}'`);
      if (borderColor) {
        styleProps.push(`borderColor: '${borderColor}'`);
        styleProps.push(`borderWidth: '${borderWidth}px'`);
      }
      if (borderRadius !== undefined) styleProps.push(`borderRadius: '${borderRadius}px'`);

      return `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CustomCard() {
  return (
    <Card className="w-[350px]${shadow ? ` shadow-${shadow}` : ''}" style={{
      ${styleProps.join(',\n      ')}
    }}>
      ${image !== false ? `<div className="w-full h-[140px] overflow-hidden rounded-t-[inherit]">
         <img src="${imageUrl}" alt="${title}" className="w-full h-full object-cover" />
      </div>` : ''}
      <CardHeader>
        <CardTitle${titleColor ? ` style={{ color: '${titleColor}' }}` : ''}>${title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription${fontColor ? ` style={{ color: '${fontColor}' }}` : ''}>
          ${description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}`;
    }

    case 'aceternity': {
      const containerStyles: string[] = [];
       if (backgroundColor) {
         containerStyles.push(`backgroundColor: '${backgroundColor}'`);
       } else {
         containerStyles.push(`backgroundImage: 'url(${imageUrl})'`);
         containerStyles.push(`backgroundSize: 'cover'`);
       }
       if (borderColor) {
         containerStyles.push(`border: '${borderWidth}px solid ${borderColor}'`);
       }
       if (borderRadius !== undefined) {
         containerStyles.push(`borderRadius: '${borderRadius}px'`);
       }

      return `import { cn } from "@/lib/utils";

export function CustomCard() {
  return (
    <div className="max-w-xs w-full group/card">
      <div 
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-xl shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4",
          "transition-all duration-300 hover:shadow-2xl"
        )}
        style={{
          ${containerStyles.join(',\n          ')}
        }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10"></div>
        <div className="text content z-10">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10"${titleColor ? ` style={{ color: '${titleColor}' }}` : ''}>
            ${title}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4"${fontColor ? ` style={{ color: '${fontColor}' }}` : ''}>
            ${description}
          </p>
        </div>
      </div>
    </div>
  );
}`;
    }

    default:
      return "// Provider code not available";
  }
};
