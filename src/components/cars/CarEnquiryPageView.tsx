"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  X,
  MessageSquare,
  CalendarCheck,
  User,
  Smartphone,
  AtSign,
  Car as CarIcon,
  Calendar,
  Clock,
  AlignLeft,
  Send,
  Info,
} from "lucide-react";
import { getCarNames, formatPriceLakh } from "@/components/cars/CarDetail";
import type { Car } from "@/lib/types";

export type FormPageMode = "enquiry" | "test-drive";

export interface VehicleEnquiryFormProps {
  car: Car;
  mode?: FormPageMode;
  showVehicleCard?: boolean;
  showSegmentedToggle?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export function VehicleEnquiryForm({
  car,
  mode = "enquiry",
  showVehicleCard = true,
  showSegmentedToggle = true,
  onCancel,
  onSuccess,
}: VehicleEnquiryFormProps) {
  const { carName, variant } = getCarNames(car);
  const priceLakh = formatPriceLakh(car.price);

  // Form fields state
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [whatsappConsent, setWhatsappConsent] = useState(false);

  // Validation touch state
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submittedNotice, setSubmittedNotice] = useState(false);

  // Validation helpers
  const isNameValid = customerName.trim().length >= 2;
  const cleanedPhone = mobileNumber.replace(/[\s-]/g, "");
  const isPhoneValid =
    /^[6-9]\d{9}$/.test(cleanedPhone) ||
    (cleanedPhone.length >= 10 && /^\+?\d+$/.test(cleanedPhone));
  const isEmailValid =
    !email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isDateValid = mode === "enquiry" || Boolean(preferredDate);
  const isTimeValid = mode === "enquiry" || Boolean(preferredTime);
  const isMessageValid = message.length <= 300;

  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isDateValid &&
    isTimeValid &&
    isMessageValid &&
    privacyConsent;

  // Minimum selectable date for test drive (no past dates)
  const todayString = new Date().toISOString().split("T")[0];

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setTouched({
        customerName: true,
        mobileNumber: true,
        email: true,
        preferredDate: true,
        preferredTime: true,
        privacyConsent: true,
      });
      return;
    }

    // Frontend validation succeeded. Display informational banner (no backend connection claimed)
    setSubmittedNotice(true);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. SELECTED VEHICLE SUMMARY CARD */}
      {showVehicleCard && (
        <div className="rounded-2xl bg-white p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs flex items-center gap-3.5 sm:gap-4">
          <div className="relative h-18 w-24 sm:h-22 sm:w-32 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
            {car.images && car.images[0] ? (
              <Image
                src={car.images[0]}
                alt={car.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 96px, 128px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-300">
                <CarIcon size={24} />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 truncate">
              {carName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              {car.year} &middot; {variant}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm sm:text-base md:text-lg font-bold text-[#9A7B2C]">
                {priceLakh}
              </span>
              {car.status && (
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {car.status}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. ENQUIRY / TEST DRIVE SEGMENTED TOGGLE (Links to respective dedicated routes) */}
      {showSegmentedToggle && (
        <div className="rounded-full bg-white p-1 border border-slate-200 shadow-2xs grid grid-cols-2 gap-1 sm:max-w-md sm:mx-auto w-full">
          <Link
            href={`/cars/${car.slug}/enquiry`}
            className={`rounded-full py-2.5 px-3 sm:px-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all text-center ${
              mode === "enquiry"
                ? "bg-[#10264B] text-white shadow-xs"
                : "bg-transparent text-[#10264B] hover:bg-slate-50"
            }`}
          >
            <MessageSquare size={16} />
            <span>Enquiry</span>
          </Link>

          <Link
            href={`/cars/${car.slug}/test-drive`}
            className={`rounded-full py-2.5 px-3 sm:px-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all text-center ${
              mode === "test-drive"
                ? "bg-[#10264B] text-white shadow-xs"
                : "bg-transparent text-[#10264B] hover:bg-slate-50"
            }`}
          >
            <CalendarCheck size={16} />
            <span>Test Drive</span>
          </Link>
        </div>
      )}

      {/* FRONTEND SUBMISSION DEMO RESPONSE */}
      {submittedNotice ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-[#10264B] mx-auto">
            <Info size={24} />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-navy">
            Frontend Validation Passed
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            All required fields for{" "}
            <strong className="text-navy">
              {mode === "enquiry" ? "Enquiry" : "Test Drive"}
            </strong>{" "}
            on the{" "}
            <strong className="text-navy">
              {car.year} {carName} {variant}
            </strong>{" "}
            have been verified successfully.
          </p>
          <div className="rounded-xl bg-amber-50/90 border border-amber-200/80 p-3 sm:p-4 text-left max-w-md mx-auto">
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>Notice:</strong> Backend submission is not yet connected.
              This form is currently running in frontend preview mode.
            </p>
          </div>
          <div className="pt-2 flex gap-3 max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => setSubmittedNotice(false)}
              className="flex-1 rounded-xl border border-slate-300 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Edit Details
            </button>
            {onCancel ? (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 rounded-xl bg-[#10264B] py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#163761] cursor-pointer"
              >
                Close
              </button>
            ) : (
              <Link
                href={`/cars/${car.slug}`}
                className="flex-1 rounded-xl bg-[#10264B] py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#163761] text-center"
              >
                Back to Car
              </Link>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* RESPONSIVE ROW 1: Customer Name & Mobile Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* FIELD 1: CUSTOMER NAME */}
            <div>
              <div
                className={`rounded-2xl bg-white border px-4 py-3 sm:py-3.5 flex items-center gap-3 shadow-2xs transition-all ${
                  touched.customerName && !isNameValid
                    ? "border-rose-400 ring-1 ring-rose-400"
                    : "border-slate-200/90 focus-within:border-[#10264B] focus-within:ring-1 focus-within:ring-[#10264B]"
                }`}
              >
                <User size={18} className="text-[#10264B] shrink-0" />
                <input
                  type="text"
                  required
                  placeholder="Customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  onBlur={() => handleBlur("customerName")}
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              {touched.customerName && !isNameValid && (
                <p className="mt-1 px-3 text-[11px] text-rose-600 font-medium">
                  Please enter your name.
                </p>
              )}
            </div>

            {/* FIELD 2: MOBILE NUMBER */}
            <div>
              <div
                className={`rounded-2xl bg-white border px-4 py-3 sm:py-3.5 flex items-center gap-3 shadow-2xs transition-all ${
                  touched.mobileNumber && !isPhoneValid
                    ? "border-rose-400 ring-1 ring-rose-400"
                    : "border-slate-200/90 focus-within:border-[#10264B] focus-within:ring-1 focus-within:ring-[#10264B]"
                }`}
              >
                <Smartphone size={18} className="text-[#10264B] shrink-0" />
                <input
                  type="tel"
                  required
                  placeholder="Mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  onBlur={() => handleBlur("mobileNumber")}
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              {touched.mobileNumber && !isPhoneValid && (
                <p className="mt-1 px-3 text-[11px] text-rose-600 font-medium">
                  Please enter a valid 10-digit mobile number.
                </p>
              )}
            </div>
          </div>

          {/* FIELD 3: EMAIL (OPTIONAL) */}
          <div>
            <div
              className={`rounded-2xl bg-white border px-4 py-3 sm:py-3.5 flex items-center gap-3 shadow-2xs transition-all ${
                touched.email && !isEmailValid
                  ? "border-rose-400 ring-1 ring-rose-400"
                  : "border-slate-200/90 focus-within:border-[#10264B] focus-within:ring-1 focus-within:ring-[#10264B]"
              }`}
            >
              <AtSign size={18} className="text-[#10264B] shrink-0" />
              <input
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            {touched.email && !isEmailValid && (
              <p className="mt-1 px-3 text-[11px] text-rose-600 font-medium">
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/* FIELD 4: SELECTED VEHICLE (READ-ONLY) */}
          <div className="rounded-2xl bg-white border border-slate-200/90 px-4 py-2.5 sm:py-3 shadow-2xs">
            <span className="text-[10px] font-semibold text-slate-400 tracking-wide block mb-1">
              Selected vehicle
            </span>
            <div className="flex items-center gap-3">
              <CarIcon size={18} className="text-[#10264B] shrink-0" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-1">
                <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  {car.year} {carName} {variant}
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#9A7B2C]">
                  {priceLakh}
                </p>
              </div>
            </div>
          </div>

          {/* TEST DRIVE ONLY FIELDS: PREFERRED DATE & TIME */}
          {mode === "test-drive" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* FIELD 5: PREFERRED DATE */}
              <div>
                <div
                  className={`rounded-2xl bg-white border px-4 py-3 sm:py-3.5 flex items-center gap-3 shadow-2xs transition-all ${
                    touched.preferredDate && !isDateValid
                      ? "border-rose-400 ring-1 ring-rose-400"
                      : "border-slate-200/90 focus-within:border-[#10264B] focus-within:ring-1 focus-within:ring-[#10264B]"
                  }`}
                >
                  <Calendar size={18} className="text-[#10264B] shrink-0" />
                  <input
                    type="date"
                    required
                    min={todayString}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    onBlur={() => handleBlur("preferredDate")}
                    className="w-full bg-transparent text-sm text-slate-900 focus:outline-none cursor-pointer"
                  />
                </div>
                {touched.preferredDate && !isDateValid && (
                  <p className="mt-1 px-3 text-[11px] text-rose-600 font-medium">
                    Please select a preferred test drive date.
                  </p>
                )}
              </div>

              {/* FIELD 6: PREFERRED TIME */}
              <div>
                <div
                  className={`rounded-2xl bg-white border px-4 py-3 sm:py-3.5 flex items-center gap-3 shadow-2xs transition-all ${
                    touched.preferredTime && !isTimeValid
                      ? "border-rose-400 ring-1 ring-rose-400"
                      : "border-slate-200/90 focus-within:border-[#10264B] focus-within:ring-1 focus-within:ring-[#10264B]"
                  }`}
                >
                  <Clock size={18} className="text-[#10264B] shrink-0" />
                  <select
                    required
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    onBlur={() => handleBlur("preferredTime")}
                    className={`w-full bg-transparent text-sm focus:outline-none cursor-pointer ${
                      preferredTime ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    <option value="" disabled>
                      Preferred time
                    </option>
                    <option value="10:00 AM – 11:00 AM">10:00 AM – 11:00 AM</option>
                    <option value="11:00 AM – 12:00 PM">11:00 AM – 12:00 PM</option>
                    <option value="12:00 PM – 01:00 PM">12:00 PM – 01:00 PM</option>
                    <option value="02:00 PM – 03:00 PM">02:00 PM – 03:00 PM</option>
                    <option value="03:00 PM – 04:00 PM">03:00 PM – 04:00 PM</option>
                    <option value="04:00 PM – 05:00 PM">04:00 PM – 05:00 PM</option>
                    <option value="05:00 PM – 06:00 PM">05:00 PM – 06:00 PM</option>
                  </select>
                </div>
                {touched.preferredTime && !isTimeValid && (
                  <p className="mt-1 px-3 text-[11px] text-rose-600 font-medium">
                    Please choose a preferred time slot.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* FIELD 7: MESSAGE (OPTIONAL, MAX 300) */}
          <div>
            <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-2xs focus-within:border-[#10264B] focus-within:ring-1 focus-within:ring-[#10264B]">
              <div className="flex items-start gap-3">
                <AlignLeft size={18} className="text-[#10264B] shrink-0 mt-0.5" />
                <textarea
                  rows={3}
                  maxLength={300}
                  placeholder="Message (optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none"
                />
              </div>
            </div>
            <div className="text-right px-2 pt-1 text-[11px] text-slate-400 font-medium">
              {message.length}/300
            </div>
          </div>

          {/* FIELD 8: PRIVACY CONSENT CHECKBOX (REQUIRED) */}
          <label className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-2xs flex items-start gap-3 cursor-pointer select-none transition-colors hover:bg-slate-50/50">
            <input
              type="checkbox"
              required
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              className="mt-0.5 h-4.5 w-4.5 rounded border-slate-300 text-[#10264B] focus:ring-[#10264B] cursor-pointer"
            />
            <span className="text-xs sm:text-sm leading-relaxed text-slate-700">
              I agree that Happy Cars may contact me by phone, WhatsApp or email
              about this request and use my details only for this purpose.
              (Required){" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="font-bold text-slate-900 underline hover:text-[#10264B] inline-block ml-1"
                onClick={(e) => e.stopPropagation()}
              >
                Read the privacy policy
              </Link>
            </span>
          </label>

          {/* FIELD 9: WHATSAPP MARKETING CONSENT (OPTIONAL) */}
          <label className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-2xs flex items-start gap-3 cursor-pointer select-none transition-colors hover:bg-slate-50/50">
            <input
              type="checkbox"
              checked={whatsappConsent}
              onChange={(e) => setWhatsappConsent(e.target.checked)}
              className="mt-0.5 h-4.5 w-4.5 rounded border-slate-300 text-[#10264B] focus:ring-[#10264B] cursor-pointer"
            />
            <span className="text-xs sm:text-sm leading-relaxed text-slate-700">
              Send me offers and new arrivals on WhatsApp. (Optional – you can stop
              these at any time by replying STOP or asking our team.)
            </span>
          </label>

          {/* FIELD 10: SUBMIT BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full rounded-2xl py-3.5 px-4 flex items-center justify-center gap-2 text-sm sm:text-base font-bold transition-all ${
                isFormValid
                  ? "bg-[#10264B] text-white hover:bg-[#163761] shadow-md cursor-pointer"
                  : "bg-[#DFE4EC] text-[#506382] cursor-not-allowed opacity-90"
              }`}
            >
              <Send size={16} />
              <span>
                {mode === "test-drive" ? "Request Test Drive" : "Send Enquiry"}
              </span>
            </button>

            {/* HELPER TEXT BELOW SUBMIT BUTTON */}
            {!privacyConsent ? (
              <p className="text-center text-xs text-slate-500 mt-2 font-normal">
                Please accept the privacy consent to submit.
              </p>
            ) : !isFormValid ? (
              <p className="text-center text-xs text-slate-500 mt-2 font-normal">
                Please complete all required fields.
              </p>
            ) : null}
          </div>
        </form>
      )}
    </div>
  );
}

interface CarEnquiryPageViewProps {
  car: Car;
  mode: FormPageMode;
}

export function CarEnquiryPageView({ car, mode }: CarEnquiryPageViewProps) {
  const { carName } = getCarNames(car);

  return (
    <div className="bg-[#f8f9fb] min-h-[calc(100vh-80px)] py-6 sm:py-10 md:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Top Breadcrumb Navigation */}
        <div className="mb-4 sm:mb-6">
          <Link
            href={`/cars/${car.slug}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#102B5C] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to {carName}</span>
          </Link>
        </div>

        {/* MAIN DEDICATED FULL-PAGE FORM CONTAINER */}
        <div className="rounded-3xl bg-[#F4F6FA] border border-slate-200/90 shadow-xl overflow-hidden flex flex-col">
          {/* DEEP NAVY HEADER */}
          <header className="bg-[#0B2241] text-white px-5 sm:px-7 py-4 flex items-center justify-between shadow-sm">
            <Link
              href={`/cars/${car.slug}`}
              aria-label="Back to car details"
              className="p-1 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>

            <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white text-center">
              {mode === "test-drive" ? "Request Test Drive" : "Vehicle Enquiry"}
            </h1>

            <Link
              href={`/cars/${car.slug}`}
              aria-label="Close and return to car details"
              className="p-1 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </Link>
          </header>

          {/* FORM BODY */}
          <div className="p-4 sm:p-7">
            <VehicleEnquiryForm
              car={car}
              mode={mode}
              showVehicleCard={true}
              showSegmentedToggle={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
