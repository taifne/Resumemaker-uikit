import ModernChronologicalTemplate from "./ModernChronologicalTemplate";
import SwissResumeTemplate from "./SwissResumeTemplate";
import ElegantDarkTemplate from "./ElegantDarkTemplate";
import ModernElegantTemplate from "./ModernElegantTemplate";
import ModernSwissResumeTemplate from "./ModernSwissResumeTemplate";
import MinimalistLightTemplate from "./MinimalistLightTemplate";
import HavardBaseResumePdf from "./HavardBaseResume";
import ColorBlockTemplate from "./ColorBlockTemplate";
import ProfessionalBlueTemplate from "./ProfessionalBlueTemplate";
import TwoToneSidebarTemplate from "./TwoToneSidebarTemplate";
import ModernTemplate01 from "./ModernTemplate01";
import ModernResumeTemplate from "./ModernTemplate";
import InsaneResumeTemplate from "./InsanseTemplate";
import ClassicAcademicTemplate from "./ClassicAcademicTemplate";
import GPTTemplate from "./GPTTemplate";
import AttorneyResumeTemplate from "./AttorneyResumeTemplate";

const templateMap: Record<string, React.FC<{ resume: any }>> = {
  "modern-chronological": ModernChronologicalTemplate,
  "elegant-dark": ElegantDarkTemplate,
  "swiss-resume-template": SwissResumeTemplate,
  "modern-elegant-template": ModernElegantTemplate,
  "modern-swiss-resume-template": ModernSwissResumeTemplate,
  "minimalist-light-template": MinimalistLightTemplate,
  "harvard-template": HavardBaseResumePdf,
  "color-block-template": ColorBlockTemplate,
  "professional-blue-template": ProfessionalBlueTemplate,
  "two-tone-sidebar-template": TwoToneSidebarTemplate,
  "modern-template-01": ModernTemplate01,
  "modern-template":ModernResumeTemplate,
  "InsaneResumeTemplate":InsaneResumeTemplate,
  "ClassicAcademicTemplate":ClassicAcademicTemplate,
  "GPTTemplate":GPTTemplate,
  "AttorneyResumeTemplate":AttorneyResumeTemplate
};
export const templateOptions = Object.keys(templateMap).map((key) => ({
  label: key
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" "), 
  value: key,
}));

export default templateMap;