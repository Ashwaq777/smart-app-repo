import React from 'react'

export const Select = ({
  label,
  error,
  icon: Icon,
  className = '',
  containerClassName = '',
  children,
  ...props
}) => {
  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-3 leading-relaxed">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <select
          className={`
            w-full rounded-xl border border-gray-200
            ${Icon ? 'pl-12 pr-12' : 'px-4 pr-12'} py-3.5
            text-gray-900
            bg-white
            focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400
            hover:border-gray-300
            transition-all duration-300 ease-out
            appearance-none
            ${error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-400' : ''}
            ${className}
          `}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 leading-relaxed">{error}</p>
      )}
    </div>
  )
}
