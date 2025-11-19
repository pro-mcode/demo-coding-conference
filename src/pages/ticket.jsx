export default function Ticket({ name, email, github, avatar, id }) {
  const previewUrl = avatar ? URL.createObjectURL(avatar) : null;
  return (
    <div className="ticket-container">
      <h3 className="text-4xl font-bold text-primary text-center leading-10 tracking-wide md:text-[2.8rem] md:w-2xl md:leading-12 mx-auto">
        Congrats,{" "}
        <span className="gradient-text capitalize">{name.trim()}!</span> Your
        ticket is ready.
      </h3>
      <p className="text-base text-center text-primary-300 tracking-wide mt-6 md:text-lg md:w-sm mx-auto">
        we've emailed your ticket to{" "}
        <span className="text-main-500 lowercase">{email.trim()}</span> and will
        send updates in the run up to the event.
      </p>
      <div className="relative mx-auto mt-24 w-full max-w-md lg:min-w-lg shadow-md">
        {/* Ticket background */}
        <img
          src="assets/images/pattern-ticket.svg"
          alt=""
          className="w-full h-auto"
        />

        {/* Top section */}
        <div className="absolute top-4 left-3 sm:top-6 sm:left-5">
          <div className="flex items-start gap-x-2 md:gap-x-4">
            <img
              src="assets/images/logo-mark.svg"
              alt=""
              className="w-6 h-6 md:w-10 md:h-10"
            />

            <div>
              <h3 className="text-primary-300 text-2xl font-bold sm:text-3xl md:text-3xl -mt-2.5">
                Coding Conf
              </h3>
              <p className="text-sm text-primary-300 mt-0.5 md:mt-2 md:text-base">
                Jan 31, 2026 / Atlanta, GA
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-5">
          <div className="flex items-center gap-x-2 md:gap-x-4">
            <img
              src={previewUrl}
              alt=""
              className="w-14 h-14 md:w-16 md:h-16 rounded-lg"
            />

            <div>
              <h4 className="text-primary-300 text-lg font-medium md:text-2xl capitalize">
                {name.trim()}
              </h4>
              {github ? (
                <p className="text-sm text-primary-300 mt-0.5 md:mt-2 md:text-base flex justify-start gap-x-2">
                  <img src="assets/images/icon-github.svg" alt="" srcset="" />@
                  {github}
                </p>
              ) : (
                <p className="text-sm text-primary-300 mt-0.5 md:mt-2 md:text-base flex justify-start">
                  Conference Attendee
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Ticket ID */}
        <span className="absolute -right-2  top-[45%] text-primary-500/80 sm:text-base tb:text-lg font-semibold  rotate-90">
          #{id}
        </span>
      </div>
    </div>
  );
}
