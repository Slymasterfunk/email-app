'use client'

import { useState } from 'react'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    })
    if (res.ok) {
      alert('Email sent successfully!')
    } else {
      alert('Failed to send email.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          value={name}
          id='name'
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          value={email}
          id='email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default ContactForm
