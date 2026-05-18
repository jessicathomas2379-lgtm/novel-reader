import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  role?: string;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  'aria-hidden'?: boolean;
  'aria-label'?: string;
}

export function IconSearch({ width = 24, height = 24, className, ...props }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.4393 16.4393C17.0251 15.8535 17.9749 15.8535 18.5607 16.4393L21.0607 18.9393C21.6464 19.5251 21.6464 20.4749 21.0607 21.0607C20.4749 21.6464 19.5251 21.6464 18.9393 21.0607L16.4393 18.5607C15.8536 17.9749 15.8536 17.0251 16.4393 16.4393Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="currentColor"/>
    </svg>
  );
}


export function IconHot({ width = 24, height = 24, className, ...props }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M6.28159 7.90961C8.10031 2.98233 13.8046 1.60967 16.7972 2.0893C16.7972 2.0893 15.8709 5.11614 16.6976 6.42231C17.9541 5.95938 17.9382 6.0074 20.1039 6.32172C18.0537 10.2236 21.5799 11.0923 20.683 15.6469C20.0833 18.6916 18.1314 20.7371 15.9457 21.7602C14.8086 21.7773 13.4157 20.4232 12.9789 19.392C12.5384 18.352 12.4182 16.2765 12.9457 15.2914C12.7055 15.364 11.1594 15.6213 9.8646 17.1215C8.73479 18.4307 8.41126 20.7288 8.87241 21.7612C7.07026 21.0103 5.4591 19.7217 4.34409 17.9623C2.38654 14.8736 2.72452 10.621 4.34409 6.71918C4.34409 6.71918 4.67016 7.00837 5.24058 7.39692C5.80317 7.78011 6.26899 7.90625 6.28159 7.90961Z" fill="url(#paint0_hot)"/>
      <path d="M20.6497 15.9453C20.2876 17.8448 19.2269 19.1803 18.1035 20.3267C18.6256 19.7432 20.2578 17.3846 20.0214 13.9943C19.7851 10.604 17.4587 7.95947 16.6816 6.40532C17.7398 5.85968 19.5499 5.6323 20.7675 5.97263C18.741 9.95774 21.5366 11.2933 20.6497 15.9453Z" fill="url(#paint1_hot)"/>
      <defs>
        <linearGradient id="paint0_hot" x1="13.1754" y1="20.9358" x2="13.7072" y2="0.265829" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6E11"/>
          <stop offset="1" stopColor="#FF5E5E"/>
        </linearGradient>
        <linearGradient id="paint1_hot" x1="18.0237" y1="20.3435" x2="21.1819" y2="6.02474" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC555"/>
          <stop offset="1" stopColor="#FF9921"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconRefresh({ width = 24, height = 24, className, ...props }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M4 12C4 7.58172 7.58172 4 12 4C14.5171 4 16.7288 5.1635 18.1822 6.99321L16.5029 6.98829C15.9506 6.98667 15.5016 7.43307 15.5 7.98535C15.4984 8.53763 15.9448 8.98666 16.4971 8.98828L19.9399 8.99836C19.9783 9.00071 20.017 9.00084 20.0557 8.9987L20.4971 9C20.7628 9.00077 21.0179 8.89576 21.2061 8.70814C21.3942 8.52052 21.5 8.26572 21.5 8L21.5 4C21.5 3.44771 21.0523 3 20.5 3C19.9477 3 19.5 3.44772 19.5 4L19.5 5.44947C17.6875 3.34038 15.023 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C15.9359 22 19.2641 19.7278 20.8955 16.445C21.1413 15.9505 20.9396 15.3503 20.445 15.1045C19.9505 14.8587 19.3503 15.0604 19.1045 15.555C17.7905 18.1991 15.1315 20 12 20C7.58172 20 4 16.4183 4 12Z" fill="currentColor"/>
    </svg>
  );
}


export function IconArrowLeft({ width = 24, height = 24, className, ...props }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L8.70711 14.1213C7.53553 12.9497 7.53554 11.0503 8.70711 9.87868L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L10.1213 11.2929C9.7308 11.6834 9.7308 12.3166 10.1213 12.7071L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071Z" fill="currentColor"/>
    </svg>
  );
}

export function IconArrowRight({ width = 24, height = 24, className, ...props }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.43934 4.93934C10.0251 4.35355 10.9749 4.35355 11.5607 4.93934L15.9697 9.34835C17.4341 10.8128 17.4341 13.1872 15.9697 14.6516L11.5607 19.0607C10.9749 19.6464 10.0251 19.6464 9.43934 19.0607C8.85355 18.4749 8.85355 17.5251 9.43934 16.9393L13.8483 12.5303C14.1412 12.2374 14.1412 11.7626 13.8483 11.4697L9.43934 7.06066C8.85355 6.47487 8.85355 5.52513 9.43934 4.93934Z" fill="currentColor"/>
    </svg>
  );
}

export function IconTabbarHome({ width = 24, height = 24, className, ...props }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M21.3142 6.13599L14.1495 1.80206C13.626 1.4862 13.028 1.31515 12.4167 1.30646C11.8054 1.29776 11.2028 1.45171 10.6706 1.75255L2.93434 6.13599C1.91723 6.71205 1.28267 7.78315 1.28267 8.92177V19.6778C1.28267 21.46 2.78582 22.9092 4.63101 22.9092H19.5365C21.3862 22.9092 22.8848 21.46 22.8848 19.6778V8.87676C22.8848 7.75615 22.2998 6.73455 21.3142 6.14049V6.13599ZM16.4222 17.8867H7.74532C7.29977 17.8867 6.93974 17.5491 6.93974 17.1351C6.93974 16.721 7.29977 16.3835 7.74532 16.3835H16.4222C16.8677 16.3835 17.2278 16.721 17.2278 17.1351C17.2278 17.5491 16.8677 17.8867 16.4222 17.8867Z" fill="currentColor"/>
    </svg>
  );
}

export function IconTabbarProfile({ width = 24, height = 24, className, ...props }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M20.4229 1.11133C21.5607 1.11133 22.4834 2.05672 22.4834 3.22266V11.667C22.4833 17.4966 17.871 22.2227 12.1816 22.2227H11.1514C5.46218 22.2225 0.84973 17.4965 0.849609 11.667C0.849609 5.83743 5.4621 1.1115 11.1514 1.11133H20.4229ZM8.5 9.55566C7.91703 9.55566 7.44434 10.0284 7.44434 10.6113V12.7227C7.44451 13.3055 7.91714 13.7783 8.5 13.7783C9.08281 13.7783 9.55549 13.3054 9.55566 12.7227V10.6113C9.55566 10.0284 9.08292 9.55572 8.5 9.55566ZM13.7773 9.55566C13.1946 9.55589 12.7227 10.0285 12.7227 10.6113V12.7227C12.7228 13.3053 13.1947 13.7781 13.7773 13.7783C14.3602 13.7783 14.8328 13.3055 14.833 12.7227V10.6113C14.833 10.0284 14.3603 9.55566 13.7773 9.55566Z" fill="currentColor"/>
    </svg>
  );
}
