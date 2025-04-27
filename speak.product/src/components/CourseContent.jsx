import React from "react";

const CourseContent = ({
  course,
  descriptionRef,
  whatYoullLearnRef,
  aboutSpeakHireRef,
  scrollToSection,
}) => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-1/4 pr-4">
            <nav className="sticky top-50 flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection(descriptionRef)}
                className="text-left font-medium text-gray-900 hover:text-blue-600 focus:outline-none"
              >
                Description
              </button>
              <button
                onClick={() => scrollToSection(whatYoullLearnRef)}
                className="text-left font-medium text-gray-900 hover:text-blue-600 focus:outline-none"
              >
                What You'll Learn
              </button>
              <button
                onClick={() => scrollToSection(aboutSpeakHireRef)}
                className="text-left font-medium text-gray-900 hover:text-blue-600 focus:outline-none"
              >
                About SpeakHire
              </button>
            </nav>
          </div>

          {/* Main content area */}
          <div className="w-3/4 pl-8">
            {/* Description Section */}
            <section id="description" className="mb-10" ref={descriptionRef}>
              <h2 className="text-3xl font-bold mb-4">Description</h2>
             {course.description}
              <hr className="my-8 border-gray-200" />
            </section>

            {/* What You'll Learn Section */}
            <section
              id="what-youll-learn"
              className="mb-10"
              ref={whatYoullLearnRef}
            >
              <h2 className="text-3xl font-bold mb-4">What You'll Learn</h2>
              <ol className="list-decimal pl-6 space-y-3">
                <li>{course.learning_outcomes}</li>
              </ol>
              <hr className="my-8 border-gray-200" />
            </section>

            {/* About SpeakHire Section */}
            <section
              id="about-speakhire"
              className="mb-10"
              ref={aboutSpeakHireRef}
            >
              <h2 className="text-3xl font-bold mb-4">About SpeakHire</h2>
              <div className="flex items-center mb-6">
                <img
                  src="/speakhire_logo.png"
                  alt="SpeakHire Logo"
                  className="mr-4"
                />
              </div>
              <p className="text-gray-800 mb-4">
                SpeakHire Is Committed To Fostering Community Growth By Pooling
                Local Resources, Amplifying Impact, And Driving Development From
                Within. The Organization Prepares Individuals From Immigrant
                Families Through Carefully Designed Programs And Projects That
                Empower Them To Identify And Pursue Meaningful Opportunities.
              </p>
              <p className="text-gray-800">
                By Building And Inspiring A Strong Network Of Professionals,
                SpeakHire Facilitates Essential Dialogue With Key Stakeholders
                Who Help Guide Individuals Toward Personal And Professional
                Success. Through Its Mission To Support, Prepare, And Empower,
                SpeakHire Is Shaping A Stronger, More Inclusive Future.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseContent;
