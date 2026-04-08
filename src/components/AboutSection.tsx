import SectionBlock from "./SectionBlock";
import AnimatedAvatar from "./AnimatedAvatar";

const AboutSection = () => {
  return (
    <SectionBlock id="about" title="About me">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
        <AnimatedAvatar />
        <div className="flex-1">
          <p className="body-text max-w-2xl">
            I'm a results-driven Computer Science graduate with hands-on experience building interactive, high-performance web applications and participating in AI model evaluation. I specialize in bridging the gap between human expertise and complex AI systems through clean frontend architectures.
          </p>
          <p className="body-text max-w-2xl mt-6">
            From training large language models through RLHF and prompt
            engineering, to building production-grade web applications with modern
            frameworks like React and Next.js, I focus on creating high-quality,
            scalable solutions.
          </p>
          <p className="body-text max-w-2xl mt-6 mb-8">
            I embrace the philosophy of <strong>vibe coding</strong>—blending
            AI-assisted tools with a strong design aesthetic to rapidly translate
            complex ideas into fluid, highly polished digital experiences while
            maintaining clean architecture.
          </p>
        </div>
      </div>
    </SectionBlock>
  );
};

export default AboutSection;
