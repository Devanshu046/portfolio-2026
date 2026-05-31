import React, { useState } from "react";
import { Info } from "lucide-react";
import { PortfolioData } from "./types";
import { DEFAULT_PORTFOLIO_DATA } from "./data";
import PortfolioView from "./components/PortfolioView";
import PortfolioEditor from "./components/PortfolioEditor";

export default function App() {
  const portfolioData = DEFAULT_PORTFOLIO_DATA;

  const [viewMode] = useState<"split" | "preview">("preview");
  const [activeMobileTab] = useState<"preview" | "editor">("preview");

  return (
    <div className="min-h-screen bg-white flex flex-col text-zinc-900 overflow-x-hidden antialiased">
      
      {/* Main Workspace Frame */}
      <main id="workspace-layout" className="flex-1 flex overflow-hidden">
        
        {/* DESKTOP SPLIT VIEW OR MOBILE ACTIVE TAB */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left panel: Customizer (hidden when Preview Only Mode on desktop, visible based on state on mobile) */}
          <div 
            id="editor-view-dock"
            className={`w-full md:w-[380px] lg:w-[410px] xl:w-[440px] shrink-0 h-full flex-col print:hidden ${
              viewMode === "split" ? "md:flex" : "md:hidden"
            } ${
              activeMobileTab === "editor" ? "flex" : "hidden"
            }`}
          >
            <PortfolioEditor 
              data={portfolioData}
            />
          </div>

          {/* Right panel: Live Website View (takes remaining width) */}
          <div 
            id="preview-window-dock" 
            className={`flex-1 h-full overflow-y-auto bg-white pt-2 pb-16 print:p-0 print:bg-white ${
              viewMode === "preview" ? "w-full" : ""
            } ${
              activeMobileTab === "preview" ? "block" : "hidden md:block"
            }`}
          >
            {/* Aesthetic Page Canvas Frame */}
            <div className="w-full mx-auto px-4 sm:px-6 md:px-8 print:p-0">
              
              {/* Dev notice banner warning */}
              {viewMode === "split" && (
                <div className="mb-6 bg-amber-50/70 border border-amber-200/50 rounded-lg p-3 text-[11px] text-amber-800 flex items-start gap-2.5 print:hidden">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Live Synced Dev Mode:</span> Any change typed in the left panel instantly re-renders. Use <strong className="font-semibold">Print PDF</strong> in the top bar to output standard pages. Circular face frame is configured at exactly 128px!
                  </div>
                </div>
              )}

              {/* Centered Website Body Canvas (Borderless, just like https://karpathy.ai/) */}
              <div className="bg-white print:bg-white min-h-[90vh]">
                <PortfolioView data={portfolioData} />
              </div>

            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
