import React from 'react'

export const Footer = () => {
  return (
    <div className="mx-6 mt-6 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 flex items-center gap-3">
  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-blue-600">
    <i className="bi bi-info text-[10px] text-blue-600"></i>
  </div>

  <p className="text-xs text-blue-700">
    Settings will apply to all future maintenance bills. Existing bills will
    not be affected.
  </p>
</div>
  )
}
