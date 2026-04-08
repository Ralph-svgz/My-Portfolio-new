import SectionBlock from "./SectionBlock";
import AnimatedAvatar from "./AnimatedAvatar";

const AboutSection = () => {
  return (
    <SectionBlock id="about" title="About me">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
        <AnimatedAvatar />
        <div className="flex-1">
          <p className="body-text max-w-2xl">
            I'm a <strong>Frontend Engineer</strong> with a passion for building immersive, high-performance web applications that merge cutting-edge technology with intuitive design. With a foundation in Computer Science, I specialize in crafting fluid digital experiences using React, Next.js, and Three.js.
          </p>
          <p className="body-text max-w-2xl mt-6">
            My expertise extends beyond traditional frontend work, I have deep experience integrating AI workflows and RLHF methodologies into production environments ,bridging the gap between intelligent systems and human-centric interfaces.
          </p>
          <p className="body-text max-w-2xl mt-6 mb-8">
            I emphasize high-velocity development by effectively leveraging AI-assisted tools to streamline workflows while maintaining an uncompromising focus on design precision. I thrive on translating complex requirements into fluid, highly polished digital experiences that adhere to best practices in performance and scalability.
          </p>
        </div>
      </div>
    </SectionBlock>
  );
};

export default AboutSection;
