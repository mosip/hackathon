import imgFootLogoB from "figma:asset/d01052815fad41170245fccda69e19a12bcd55fc.png";
import imgIiitbNew from "figma:asset/b12ea7d05c7f72a3ee2602703ac1cb43d900b63c.png";
import imgYotubeN from "figma:asset/13047e71e460fe2f1874c9c6e7fc295934e73e44.png";
import imgLinkedinN from "figma:asset/3830b0a76a7bab95fa85912a5a26575dee198f71.png";

function FootLogoB() {
  return <div className="absolute bg-[0%_49.99%] bg-no-repeat bg-size-[100%_100.01%] h-[108.8px] left-[21.25%] right-[71.69%] top-[50px]" data-name="foot logo b" style={{ backgroundImage: `url('${imgFootLogoB}')` }} />;
}

function IiitbNew() {
  return <div className="absolute bg-no-repeat bg-size-[100%_100%] bg-top-left h-[90.39px] left-[10.49%] right-[26.3%] top-[41px]" data-name="iiitb new" style={{ backgroundImage: `url('${imgIiitbNew}')` }} />;
}

function Container() {
  return (
    <div className="absolute inset-[50px_791.52px_50px_505.48px]" data-name="Container">
      <div className="absolute flex flex-col font-['Montserrat:SemiBold',_sans-serif] h-[21px] justify-center leading-[0] left-[15px] not-italic text-[14px] text-white top-[10.5px] translate-y-[-50%] w-[95.457px]">
        <p className="leading-[21px]">Incubated by</p>
      </div>
      <IiitbNew />
    </div>
  );
}

function MispelledLinkInfoMosipIo() {
  return (
    <div className="absolute h-[18px] left-[734.97px] top-[92px] w-[100.16px]" data-name="Mispelled → Link - info@mosip.io">
      <div className="absolute flex flex-col font-['Montserrat:Regular',_sans-serif] h-[18px] justify-center leading-[0] left-0 not-italic text-[#e0bd59] text-[14px] top-[9px] translate-y-[-50%] w-[100.515px]">
        <p className="[text-underline-position:from-font] decoration-solid leading-[21px] underline">info@mosip.io</p>
      </div>
    </div>
  );
}

function Link918041407777() {
  return (
    <div className="absolute h-[18px] left-[734.97px] top-[186px] w-[107.53px]" data-name="Link - +91 8041407777">
      <div className="absolute flex flex-col font-['Montserrat:Light',_sans-serif] h-[18px] justify-center leading-[0] left-0 not-italic text-[14px] text-white top-[9px] translate-y-[-50%] w-[107.896px]">
        <p className="leading-[21px]">+91 8041407777</p>
      </div>
    </div>
  );
}

function LinkPrivacyPolicy() {
  return (
    <div className="absolute h-[18px] left-[949.47px] top-[92px] w-[93.55px]" data-name="Link - Privacy Policy">
      <div className="absolute flex flex-col font-['Montserrat:Light',_sans-serif] h-[18px] justify-center leading-[0] left-0 not-italic text-[14px] text-white top-[9px] translate-y-[-50%] w-[93.895px]">
        <p className="leading-[21px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function LinkIpPolicy() {
  return (
    <div className="absolute h-[18px] left-[949.47px] top-[123px] w-[58.61px]" data-name="Link - IP Policy">
      <div className="absolute flex flex-col font-['Montserrat:Light',_sans-serif] h-[18px] justify-center leading-[0] left-0 not-italic text-[14px] text-white top-[9px] translate-y-[-50%] w-[58.99px]">
        <p className="leading-[21px]">IP Policy</p>
      </div>
    </div>
  );
}

function YotubeN() {
  return <div className="absolute bg-no-repeat bg-size-[100%_100%] bg-top-left h-[46.13px] left-0 right-0 top-[-12.28px]" data-name="yotube n" style={{ backgroundImage: `url('${imgYotubeN}')` }} />;
}

function Link() {
  return (
    <div className="absolute h-[18px] left-[949.47px] top-[175.28px] w-[46.13px]" data-name="Link">
      <YotubeN />
    </div>
  );
}

function LinkedinN() {
  return <div className="absolute bg-no-repeat bg-size-[100%_100%] bg-top-left h-[46.13px] left-0 right-0 top-[-12.28px]" data-name="linkedin n" style={{ backgroundImage: `url('${imgLinkedinN}')` }} />;
}

function Link1() {
  return (
    <div className="absolute h-[18px] left-[1041.72px] top-[175.28px] w-[46.13px]" data-name="Link">
      <LinkedinN />
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-[#072cb8] relative size-full" data-name="Section">
      <FootLogoB />
      <div className="absolute h-[150px] top-[50px] translate-x-[-50%] w-px" data-name="Vertical Divider" style={{ left: "calc(50% - 250.27px)" }}>
        <div aria-hidden="true" className="absolute border-[#eeeeee] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
      <Container />
      <div className="absolute flex flex-col font-['Montserrat:Bold',_sans-serif] h-[21px] justify-center leading-[0] left-[734.97px] not-italic text-[14px] text-white top-[60.5px] translate-y-[-50%] w-[80.854px]">
        <p className="leading-[21px]">Contact Us</p>
      </div>
      <MispelledLinkInfoMosipIo />
      <div className="absolute flex flex-col font-['Montserrat:Light',_sans-serif] h-[60px] justify-center leading-[21px] left-[734.97px] not-italic text-[14px] text-white top-[153px] translate-y-[-50%] w-[182.42px]">
        <p className="mb-0">26/C, Electronic City,</p>
        <p className="mb-0">Hosur</p>
        <p>{`Road, Bangalore - 560100. `}</p>
      </div>
      <Link918041407777 />
      <div className="absolute flex flex-col font-['Montserrat:Bold',_sans-serif] h-[21px] justify-center leading-[0] left-[949.47px] not-italic text-[14px] text-white top-[60.5px] translate-y-[-50%] w-[89.838px]">
        <p className="leading-[21px]">Quick Links:</p>
      </div>
      <LinkPrivacyPolicy />
      <LinkIpPolicy />
      <Link />
      <Link1 />
    </div>
  );
}