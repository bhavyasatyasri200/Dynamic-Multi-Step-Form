import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export const InputField = ({ label, error, registration, type = 'text', loading, ...props }) => {
  const id = props.id || props.name;

  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
        {loading && <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full" />}
      </div>
      <input
        id={id}
        type={type}
        className={cn(
          "w-full px-4 py-3 rounded-xl border bg-white transition-all outline-none focus:ring-2 disabled:bg-slate-50 disabled:cursor-not-allowed text-slate-900",
          error 
            ? "border-red-500 focus:ring-red-200" 
            : "border-slate-200 focus:border-primary-500 focus:ring-primary-100"
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        {...registration}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-red-500 animate-in slide-in-from-top-1 duration-200">
          {error.message}
        </p>
      )}
    </div>
  );
};

export const SelectField = ({ label, error, registration, options, ...props }) => {
  const id = props.id || props.name;

  return (
    <div className="space-y-2 w-full">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <select
        id={id}
        className={cn(
          "w-full px-4 py-3 rounded-xl border bg-white transition-all outline-none focus:ring-2 appearance-none text-slate-900",
          error 
            ? "border-red-500 focus:ring-red-200" 
            : "border-slate-200 focus:border-primary-500 focus:ring-primary-100"
        )}
        {...registration}
        {...props}
      >
        <option value="">Select an option...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs font-medium text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export const RadioGroup = ({ label, error, registration, options, ...props }) => {
  return (
    <div className="space-y-3">
      <span className="text-sm font-semibold text-slate-700 block">{label}</span>
      <div className="flex gap-4">
        {options.map((opt) => (
          <label 
            key={opt.value} 
            className={cn(
              "flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all",
              registration.value === opt.value 
                ? "border-primary-600 bg-primary-50 ring-1 ring-primary-600" 
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <input
              type="radio"
              value={opt.value}
              className="sr-only"
              {...registration}
              {...props}
            />
            <span className={cn(
              "text-sm font-medium",
              registration.value === opt.value ? "text-primary-700" : "text-slate-600"
            )}>
              {opt.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-xs font-medium text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export const Checkbox = ({ label, error, registration, ...props }) => {
  const id = props.id || props.name;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center">
          <input
            id={id}
            type="checkbox"
            className="peer h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
            {...registration}
            {...props}
          />
        </div>
        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
          {label}
        </span>
      </label>
      {error && (
        <p className="text-xs font-medium text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export const Button = ({ children, variant = 'primary', className, ...props }) => {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-200',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100',
  };

  return (
    <button
      className={cn(
        "px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
