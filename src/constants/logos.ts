export const PROVIDER_LOGOS = {
  mui: "https://raw.githubusercontent.com/mui/material-ui/master/docs/public/static/logo.png",
  chakra: "https://img.icons8.com/color/512/chakra-ui.png",
  antd: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
  shadcn: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4",
  aceternity: "https://ui.aceternity.com/logo.png"
} as const;

export type ProviderId = keyof typeof PROVIDER_LOGOS;
