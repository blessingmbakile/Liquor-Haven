// Enhanced Age Verification System
document.addEventListener('DOMContentLoaded', () => {
  const ageVerified = checkAgeVerification();
  if (!ageVerified) {
      const modal = new bootstrap.Modal(document.getElementById('age-verification'));
      modal.show();
  }
});

function checkAgeVerification() {
  const verificationTime = localStorage.getItem('ageVerifiedTime');
  const verificationDuration = 24 * 60 * 60 * 1000; // 24 hours
  
  // Check if verification is valid
  return verificationTime && (Date.now() - parseInt(verificationTime) <= verificationDuration);
}

function verifyAge(isOfAge) {
  const modal = bootstrap.Modal.getInstance(document.getElementById('age-verification'));
  
  if (isOfAge) {
      localStorage.setItem('ageVerifiedTime', Date.now());
      modal.hide();
  } else {
      window.location.href = 'https://www.responsibility.org/';
  }
}