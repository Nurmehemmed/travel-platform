"use client";

import React from "react";
import {
  VisaItem,
  TransferItem,
  TourReservationItem,
  DestinationItem,
  LightboxImage,
  AdminLanguage,
  DestinationPreset,
} from "./types";
import {
  NewTourModal,
  VisaModal,
  TransferModal,
  TourReservationModal,
  DestinationModal,
  LightboxModal,
} from "./modals";

export interface AdminModalsProps {
  language: AdminLanguage;
  adminT: any;
  // Create Tour
  isNewTourOpen: boolean;
  setIsNewTourOpen: (open: boolean) => void;
  destinationsList: DestinationItem[];
  newTourTitle: string;
  setNewTourTitle: (val: string) => void;
  newTourDestId: string;
  setNewTourDestId: (val: string) => void;
  newTourOverview: string;
  setNewTourOverview: (val: string) => void;
  newTourBasePrice: string;
  setNewTourBasePrice: (val: string) => void;
  newTourPromoPrice: string;
  setNewTourPromoPrice: (val: string) => void;
  newTourDays: string;
  setNewTourDays: (val: string) => void;
  newTourImage: string;
  setNewTourImage: (val: string) => void;
  createLoading: boolean;
  handleCreateTour: (e: React.FormEvent) => void;

  // Visa Process
  isVisaModalOpen: boolean;
  setIsVisaModalOpen: (open: boolean) => void;
  selectedVisa: VisaItem | null;
  editStatus: string;
  setEditStatus: (status: any) => void;
  editAsanId: string;
  setEditAsanId: (val: string) => void;
  editPdfUrl: string;
  setEditPdfUrl: (val: string) => void;
  editNotes: string;
  setEditNotes: (val: string) => void;
  visaUpdateLoading: boolean;
  handleUpdateVisa: (e: React.FormEvent) => void;
  getVisaSla: (visa: VisaItem) => React.ReactNode;
  checkPassportExpiry: (
    expiryDate: string,
    arrivalDate: string
  ) => { isWarning: boolean; days: number; message: string } | null;
  handleCopyAsanFormat: (visa: VisaItem) => void;

  // Transfer Dispatch
  isTransferModalOpen: boolean;
  setIsTransferModalOpen: (open: boolean) => void;
  selectedTransfer: TransferItem | null;
  editTransferStatus: string;
  setEditTransferStatus: (status: any) => void;
  editTransferPaymentStatus: string;
  setEditTransferPaymentStatus: (status: string) => void;
  editDriverName: string;
  setEditDriverName: (val: string) => void;
  editDriverPhone: string;
  setEditDriverPhone: (val: string) => void;
  editTransferNotes: string;
  setEditTransferNotes: (val: string) => void;
  transferUpdateLoading: boolean;
  handleUpdateTransfer: (e: React.FormEvent) => void;

  // Tour Reservation
  isTourResModalOpen: boolean;
  setIsTourResModalOpen: (open: boolean) => void;
  selectedTourRes: TourReservationItem | null;
  editTourResStatus: string;
  setEditTourResStatus: (status: any) => void;
  editGuideName: string;
  setEditGuideName: (val: string) => void;
  editGuidePhone: string;
  setEditGuidePhone: (val: string) => void;
  editTourResNotes: string;
  setEditTourResNotes: (val: string) => void;
  tourResUpdateLoading: boolean;
  handleUpdateTourRes: (e: React.FormEvent) => void;

  // Destination Create / Edit
  isDestinationModalOpen: boolean;
  setIsDestinationModalOpen: (open: boolean) => void;
  destinationModalMode: "create" | "edit";
  destFormName: string;
  setDestFormName: (val: string) => void;
  destFormCountry: string;
  setDestFormCountry: (val: string) => void;
  destFormSlug: string;
  setDestFormSlug: (val: string) => void;
  destFormHeroImage: string;
  setDestFormHeroImage: (val: string) => void;
  destSaving: boolean;
  handleSaveDestination: (e: React.FormEvent) => void;
  handleSelectPresetDestination: (preset: DestinationPreset) => void;

  // Lightbox
  lightboxImage: LightboxImage | null;
  setLightboxImage: (img: LightboxImage | null) => void;
}

export const AdminModals: React.FC<AdminModalsProps> = ({
  language,
  adminT,
  isNewTourOpen,
  setIsNewTourOpen,
  destinationsList,
  newTourTitle,
  setNewTourTitle,
  newTourDestId,
  setNewTourDestId,
  newTourOverview,
  setNewTourOverview,
  newTourBasePrice,
  setNewTourBasePrice,
  newTourPromoPrice,
  setNewTourPromoPrice,
  newTourDays,
  setNewTourDays,
  newTourImage,
  setNewTourImage,
  createLoading,
  handleCreateTour,
  isVisaModalOpen,
  setIsVisaModalOpen,
  selectedVisa,
  editStatus,
  setEditStatus,
  editAsanId,
  setEditAsanId,
  editPdfUrl,
  setEditPdfUrl,
  editNotes,
  setEditNotes,
  visaUpdateLoading,
  handleUpdateVisa,
  getVisaSla,
  checkPassportExpiry,
  handleCopyAsanFormat,
  isTransferModalOpen,
  setIsTransferModalOpen,
  selectedTransfer,
  editTransferStatus,
  setEditTransferStatus,
  editTransferPaymentStatus,
  setEditTransferPaymentStatus,
  editDriverName,
  setEditDriverName,
  editDriverPhone,
  setEditDriverPhone,
  editTransferNotes,
  setEditTransferNotes,
  transferUpdateLoading,
  handleUpdateTransfer,
  isTourResModalOpen,
  setIsTourResModalOpen,
  selectedTourRes,
  editTourResStatus,
  setEditTourResStatus,
  editGuideName,
  setEditGuideName,
  editGuidePhone,
  setEditGuidePhone,
  editTourResNotes,
  setEditTourResNotes,
  tourResUpdateLoading,
  handleUpdateTourRes,
  isDestinationModalOpen,
  setIsDestinationModalOpen,
  destinationModalMode,
  destFormName,
  setDestFormName,
  destFormCountry,
  setDestFormCountry,
  destFormSlug,
  setDestFormSlug,
  destFormHeroImage,
  setDestFormHeroImage,
  destSaving,
  handleSaveDestination,
  handleSelectPresetDestination,
  lightboxImage,
  setLightboxImage,
}) => {
  return (
    <>
      <NewTourModal
        isOpen={isNewTourOpen}
        onClose={() => setIsNewTourOpen(false)}
        language={language}
        adminT={adminT}
        destinationsList={destinationsList}
        newTourTitle={newTourTitle}
        setNewTourTitle={setNewTourTitle}
        newTourDestId={newTourDestId}
        setNewTourDestId={setNewTourDestId}
        newTourOverview={newTourOverview}
        setNewTourOverview={setNewTourOverview}
        newTourBasePrice={newTourBasePrice}
        setNewTourBasePrice={setNewTourBasePrice}
        newTourPromoPrice={newTourPromoPrice}
        setNewTourPromoPrice={setNewTourPromoPrice}
        newTourDays={newTourDays}
        setNewTourDays={setNewTourDays}
        newTourImage={newTourImage}
        setNewTourImage={setNewTourImage}
        createLoading={createLoading}
        handleCreateTour={handleCreateTour}
      />

      <VisaModal
        isOpen={isVisaModalOpen}
        onClose={() => setIsVisaModalOpen(false)}
        selectedVisa={selectedVisa}
        language={language}
        adminT={adminT}
        editStatus={editStatus}
        setEditStatus={setEditStatus}
        editAsanId={editAsanId}
        setEditAsanId={setEditAsanId}
        editPdfUrl={editPdfUrl}
        setEditPdfUrl={setEditPdfUrl}
        editNotes={editNotes}
        setEditNotes={setEditNotes}
        visaUpdateLoading={visaUpdateLoading}
        handleUpdateVisa={handleUpdateVisa}
        getVisaSla={getVisaSla}
        checkPassportExpiry={checkPassportExpiry}
        handleCopyAsanFormat={handleCopyAsanFormat}
        setLightboxImage={setLightboxImage}
      />

      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        selectedTransfer={selectedTransfer}
        language={language}
        adminT={adminT}
        editTransferStatus={editTransferStatus}
        setEditTransferStatus={setEditTransferStatus}
        editTransferPaymentStatus={editTransferPaymentStatus}
        setEditTransferPaymentStatus={setEditTransferPaymentStatus}
        editDriverName={editDriverName}
        setEditDriverName={setEditDriverName}
        editDriverPhone={editDriverPhone}
        setEditDriverPhone={setEditDriverPhone}
        editTransferNotes={editTransferNotes}
        setEditTransferNotes={setEditTransferNotes}
        transferUpdateLoading={transferUpdateLoading}
        handleUpdateTransfer={handleUpdateTransfer}
      />

      <TourReservationModal
        isOpen={isTourResModalOpen}
        onClose={() => setIsTourResModalOpen(false)}
        selectedTourRes={selectedTourRes}
        language={language}
        adminT={adminT}
        editTourResStatus={editTourResStatus}
        setEditTourResStatus={setEditTourResStatus}
        editGuideName={editGuideName}
        setEditGuideName={setEditGuideName}
        editGuidePhone={editGuidePhone}
        setEditGuidePhone={setEditGuidePhone}
        editTourResNotes={editTourResNotes}
        setEditTourResNotes={setEditTourResNotes}
        tourResUpdateLoading={tourResUpdateLoading}
        handleUpdateTourRes={handleUpdateTourRes}
      />

      <DestinationModal
        isOpen={isDestinationModalOpen}
        onClose={() => setIsDestinationModalOpen(false)}
        destinationModalMode={destinationModalMode}
        language={language}
        adminT={adminT}
        destFormName={destFormName}
        setDestFormName={setDestFormName}
        destFormCountry={destFormCountry}
        setDestFormCountry={setDestFormCountry}
        destFormSlug={destFormSlug}
        setDestFormSlug={setDestFormSlug}
        destFormHeroImage={destFormHeroImage}
        setDestFormHeroImage={setDestFormHeroImage}
        destSaving={destSaving}
        handleSaveDestination={handleSaveDestination}
        handleSelectPresetDestination={handleSelectPresetDestination}
      />

      <LightboxModal
        lightboxImage={lightboxImage}
        onClose={() => setLightboxImage(null)}
        language={language}
      />
    </>
  );
};
