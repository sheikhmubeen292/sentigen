"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { X, Save, Upload, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PageContent } from "@/types/page-content";
import EditStreetWear from "./culturelanding/component/edit-dailog/editDialog";
import HeroTextEdit from "./culturelanding/component/edit-dailog/edit-heroText";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import HeroBanner from "./culturelanding/component/edit-dailog/heroImg";

interface EditorSidebarProps {
  open: boolean;
  onClose: () => void;
  selectedElement: {
    id: string;
    type: "text" | "image";
    section: string;
  } | null;
  content: PageContent;
  onContentUpdate: (
    sectionId: string,
    elementId: string,
    value: string | { src: string; alt: string }
  ) => void;
}

export function EditorSidebar({
  open,
  onClose,
  selectedElement,
  content,
  onContentUpdate,
}: EditorSidebarProps) {
  const [textValue, setTextValue] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [uploadTab, setUploadTab] = useState<"url" | "upload">("url");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [boys2Text, setBoys2Text] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [webLink, setWebLink] = useState("");

  useEffect(() => {
    if (selectedElement && open) {
      const section = content.sections.find(
        (s) => s.id === selectedElement.section
      );
      if (section) {
        const element = section.elements.find(
          (e) => e.id === selectedElement.id
        );
        if (element) {
          if (element.type === "text") {
            setTextValue(element.content);
          } else if (element.type === "image") {
            setImageSrc(element.src);
            setImageAlt(element.alt || "");
            setUploadTab("url");

            // Handle boys2-image specific content
            if (element.id === "boys2-image" && element?.text) {
              setBoys2Text(element?.text.content || "");
              setTelegramLink(element?.text.iconUrl?.telegram || "#");
              setTwitterLink(element?.text.iconUrl?.twitter || "#");
              setWebLink(element?.text.iconUrl?.website || "#");
            }
          }
        }
      }
    }
  }, [selectedElement, open, content]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!selectedElement) return;

    if (selectedElement.type === "text") {
      onContentUpdate(selectedElement.section, selectedElement.id, textValue);
    } else if (selectedElement.type === "image") {
      if (selectedElement.id === "boys2-image") {
        // Special handling for boys2-image with text content and icon URLs
        onContentUpdate(selectedElement.section, selectedElement.id, {
          src: imageSrc,
          alt: imageAlt,
          text: {
            content: boys2Text,
            iconUrl: {
              telegram: telegramLink,
              twitter: twitterLink,
              website: webLink,
            },
          },
        });
      } else {
        // Normal image handling
        onContentUpdate(selectedElement.section, selectedElement.id, {
          src: imageSrc,
          alt: imageAlt,
        });
      }
    }

    onClose();
  };

  if (!selectedElement) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ease-in-out ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-[#181B1C] text-[#F2F2F2] border-l shadow-lg transform transition-all duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4">
            <div
              className="flex flex-row items-center  justify-between"
              onClick={onClose}
            >
              <button className="text-sm text-muted-foreground hover:text-foreground flex flex-row items-center">
                <IoIosArrowDropleftCircle
                  style={{ fontSize: "22px", marginRight: "10px" }}
                />{" "}
                <p className="hidden md:block">Edit Hero</p>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {selectedElement?.type === "text" ? (
              selectedElement?.id === "hero-title" ? (
                <HeroTextEdit
                  textValue={textValue}
                  setTextValue={setTextValue}
                />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-content">Text Content</Label>
                    <Textarea
                      id="text-content"
                      value={textValue}
                      onChange={(e) => setTextValue(e.target.value)}
                      rows={8}
                      className="bg-[#222627] text-white placeholder-[#F2F2F2] resize-none border-none rounded-none"
                    />
                  </div>
                </div>
              )
            ) : selectedElement?.id === "boys2-image" ? (
              <EditStreetWear
                boys2Text={boys2Text}
                setBoys2Text={setBoys2Text}
                telegramLink={telegramLink}
                setTelegramLink={setTelegramLink}
                twitterLink={twitterLink}
                setTwitterLink={setTwitterLink}
                webLink={webLink}
                setWebLink={setWebLink}
                imageAlt={imageAlt}
                setImageAlt={setImageAlt}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
              />
            ) : selectedElement?.type === "image" ? (
              selectedElement?.id === "hero-image" ? (
                <HeroBanner
                  ref={fileInputRef}
                  handleFileChange={handleFileChange}
                  imageSrc={imageSrc}
                />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-upload">Upload Image</Label>
                    <div className="grid gap-2">
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="bg-[#222627] text-white placeholder-[#F2F2F2] resize-none border-none rounded-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image-alt">Alt Text</Label>
                    <Input
                      id="image-alt"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      className="bg-[#222627] text-white placeholder-[#F2F2F2] resize-none border-none rounded-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      Describe the image for accessibility and SEO purposes
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Preview:
                    </p>
                    {imageSrc ? (
                      <div className="border rounded-md overflow-hidden">
                        <img
                          src={imageSrc || "/placeholder.svg"}
                          alt={imageAlt}
                          className="w-full h-auto object-cover max-h-40"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/placeholder.svg?height=200&width=300";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="border rounded-md p-4 text-center text-muted-foreground">
                        No image selected
                      </div>
                    )}
                  </div>
                </div>
              )
            ) : null}
          </div>

          <div className="p-4 border-t">
            <Button
              onClick={handleSave}
              className="bg-white text-[#1F1F1F] hover:bg-gray-200 w-full"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
