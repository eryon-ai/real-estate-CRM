"use client";

import dynamic from 'next/dynamic';

const CustomCursor = dynamic(() => import('@/components/realist/CustomCursor'), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/realist/SmoothScroll'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/components/realist/ScrollProgress'), { ssr: false });
const ToastContainer = dynamic(() => import('@/components/realist/ToastContainer'), { ssr: false });
const BackToTop = dynamic(() => import('@/components/realist/BackToTop'), { ssr: false });
const WhatsAppButton = dynamic(() => import('@/components/realist/WhatsAppButton'), { ssr: false });
const MobileBottomNav = dynamic(() => import('@/components/realist/MobileBottomNav'), { ssr: false });
const ExitIntentPopup = dynamic(() => import('@/components/realist/ExitIntentPopup'), { ssr: false });

export default function ClientUtilities() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <ExitIntentPopup />
      <ToastContainer />
      <BackToTop />
      <WhatsAppButton />
      <MobileBottomNav />
    </>
  );
}
