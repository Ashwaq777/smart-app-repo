import React from 'react'

export const Input = ({
  label,
  error,
  icon: Icon,
  className = '',
  containerClassName = '',
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
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          className={`
            w-full rounded-xl border border-gray-200
            ${Icon ? 'pl-12 pr-4' : 'px-4'} py-3.5
            text-gray-900 placeholder-gray-400
            bg-white
            focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400
            hover:border-gray-300
            transition-all duration-300 ease-out
            ${error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-400' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 leading-relaxed">{error}</p>
      )}
    </div>
  )
}
