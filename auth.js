// Age Verification System
document.addEventListener('DOMContentLoaded', () => {
    checkAgeVerification();
  });
  
  function checkAgeVerification() {
    const verification = document.getElementById('age-verification');
    const verificationTime = localStorage.getItem('ageVerifiedTime');
    const verificationDuration = 24 * 60 * 60 * 1000; // 24 hours
    
    // Check if verification has expired or doesn't exist
    if (!verificationTime || (Date.now() - verificationTime > verificationDuration)) {
      verification.style.display = 'flex';
      document.body.classList.add('verification-active');
      localStorage.removeItem('ageVerifiedTime');
    }
  }
  
  function verifyAge(isOfAge) {
    const verification = document.getElementById('age-verification');
    
    if (isOfAge) {
      localStorage.setItem('ageVerifiedTime', Date.now());
      verification.style.display = 'none';
      document.body.classList.remove('verification-active');
    } else {
      window.location.href = 'https://www.responsibility.org/';
    }
  }