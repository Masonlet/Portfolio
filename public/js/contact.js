document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const statusDiv = document.getElementById('form-status');
  const submitBtn = e.target.querySelector('input[type="submit"]');
  
  submitBtn.disabled = true;
  statusDiv.textContent = 'Sending...';
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      statusDiv.textContent = 'Message sent successfully!';
      e.target.reset();
    } else {
      statusDiv.textContent = data.error || 'Failed to send message';
    }
  } catch (error) {
    statusDiv.textContent = 'Error sending message';
  } finally {
    submitBtn.disabled = false;
  }
});
