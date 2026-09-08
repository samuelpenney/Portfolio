const contactEmailButton = document.querySelector(".contact-email");
const contactDialog = document.querySelector(".contact-dialog");
const contactDialogClose = document.querySelector(".contact-dialog-close");
const contactForm = document.querySelector(".contact-form");
const contactFormStatus = document.querySelector(".contact-form-status");

contactEmailButton.addEventListener("click", () => contactDialog.showModal());
contactDialogClose.addEventListener("click", () => contactDialog.close());

contactDialog.addEventListener("click", (event) => {
  if (event.target === contactDialog) {
    contactDialog.close();
  }
});

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector(".contact-submit");
  submitButton.disabled = true;
  contactFormStatus.textContent = "Sending...";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Unable to send your message.");
    }

    contactForm.reset();
    contactFormStatus.textContent = "Message sent successfully.";
    window.setTimeout(() => contactDialog.close(), 900);
  } catch (error) {
    contactFormStatus.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});
