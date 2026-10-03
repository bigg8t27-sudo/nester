import { useState } from 'react'
import { CheckCircle, Upload, X } from 'lucide-react'
import FormField          from '@/components/ui/FormField'
import FormSelect         from '@/components/ui/FormSelect'
import FormTextarea       from '@/components/ui/FormTextarea'
import FormCheckboxGroup  from '@/components/ui/FormCheckboxGroup'

// ── Constants ─────────────────────────────────────────────────────────────────
const PROPERTY_TYPES  = [
  { value: 'apartment',  label: 'Apartment' },
  { value: 'house',      label: 'House' },
  { value: 'villa',      label: 'Villa' },
  { value: 'townhouse',  label: 'Townhouse' },
  { value: 'land',       label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
]

const TRANSACTION_TYPES = [
  { value: 'buy',  label: 'For sale' },
  { value: 'rent', label: 'For rent' },
]

const CURRENCIES = [
  { value: 'GHS', label: 'GH₵ — Ghana Cedi' },
  { value: 'USD', label: '$ — US Dollar' },
  { value: 'EUR', label: '€ — Euro' },
]

const REGIONS = [
  { value: 'Greater Accra', label: 'Greater Accra' },
  { value: 'Ashanti',       label: 'Ashanti' },
  { value: 'Western',       label: 'Western' },
  { value: 'Eastern',       label: 'Eastern' },
  { value: 'Central',       label: 'Central' },
  { value: 'Northern',      label: 'Northern' },
  { value: 'Volta',         label: 'Volta' },
  { value: 'Upper East',    label: 'Upper East' },
  { value: 'Upper West',    label: 'Upper West' },
  { value: 'Brong-Ahafo',   label: 'Brong-Ahafo' },
]

const AMENITY_OPTIONS = [
  'Parking', 'Swimming Pool', 'Security', 'Furnished',
  'Air Conditioning', 'Generator', 'Garden', 'Gym',
  'WiFi', 'Balcony', 'CCTV', 'Water Heater',
]

const FURNISHING_OPTIONS = [
  { value: 'furnished',   label: 'Furnished' },
  { value: 'unfurnished', label: 'Unfurnished' },
  { value: 'partially',   label: 'Partially furnished' },
]

const AVAILABILITY_OPTIONS = [
  { value: 'available_now',    label: 'Available now' },
  { value: 'available_soon',   label: 'Available within 30 days' },
  { value: 'available_later',  label: 'Available later (specify)' },
]

const BEDROOM_OPTS  = Array.from({ length: 10 }, (_, i) => ({ value: String(i), label: i === 0 ? 'Studio / N/A' : String(i) }))
const BATHROOM_OPTS = Array.from({ length: 10 }, (_, i) => ({ value: String(i), label: i === 0 ? 'N/A' : String(i) }))
const PARKING_OPTS  = Array.from({ length: 6  }, (_, i) => ({ value: String(i), label: i === 0 ? 'None' : String(i) }))

// ── Form state ────────────────────────────────────────────────────────────────
export interface PropertyFormData {
  title:           string
  description:     string
  propertyType:    string
  transactionType: string
  price:           string
  currency:        string
  address:         string
  neighborhood:    string
  city:            string
  region:          string
  bedrooms:        string
  bathrooms:       string
  parking:         string
  area:            string
  amenities:       string[]
  furnishing:      string
  availability:    string
}

export const EMPTY_FORM: PropertyFormData = {
  title: '', description: '', propertyType: '', transactionType: '',
  price: '', currency: 'GHS', address: '', neighborhood: '',
  city: '', region: '', bedrooms: '0', bathrooms: '0',
  parking: '0', area: '', amenities: [], furnishing: '', availability: '',
}

interface FormErrors { [key: string]: string | undefined }

interface PropertyFormProps {
  mode?:      'sell' | 'agent'
  onSuccess?: (data: PropertyFormData) => void
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function PropertyForm({ mode = 'sell', onSuccess }: PropertyFormProps) {
  const [form,       setForm]       = useState<PropertyFormData>(EMPTY_FORM)
  const [errors,     setErrors]     = useState<FormErrors>({})
  const [submitted,  setSubmitted]  = useState(false)
  const [loading,    setLoading]    = useState(false)
  const [imageNames, setImageNames] = useState<string[]>([])

  function setField(field: keyof PropertyFormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function setAmenities(updated: string[]) {
    setForm((prev) => ({ ...prev, amenities: updated }))
  }

  function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    setImageNames(files.map((f) => f.name))
  }

  function removeImage(name: string) {
    setImageNames((prev) => prev.filter((n) => n !== name))
  }

  function validate(): boolean {
    const errs: FormErrors = {}
    if (!form.title.trim())           errs.title           = 'Property title is required.'
    if (!form.description.trim())     errs.description     = 'Description is required.'
    if (form.description.trim().length < 30) errs.description = 'Description must be at least 30 characters.'
    if (!form.propertyType)           errs.propertyType    = 'Select a property type.'
    if (!form.transactionType)        errs.transactionType = 'Select a transaction type.'
    if (!form.price.trim())           errs.price           = 'Price is required.'
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0) errs.price = 'Enter a valid price.'
    if (!form.city.trim())            errs.city            = 'City is required.'
    if (!form.region)                 errs.region          = 'Region is required.'
    if (!form.area.trim())            errs.area            = 'Property area is required.'
    else if (isNaN(Number(form.area)) || Number(form.area) <= 0) errs.area = 'Enter a valid area in m².'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSaveDraft() {
    // Persist to localStorage as a draft
    try {
      localStorage.setItem('nesta_draft_property', JSON.stringify(form))
      alert('Draft saved locally.')
    } catch { /* ignore */ }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) {
      const firstErr = document.querySelector('[data-error="true"]')
      firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      onSuccess?.(form)
    }, 900)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center gap-5 py-16 bg-white rounded-2xl border border-border">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle size={32} className="text-emerald-600" />
        </div>
        <div>
          <h3 className="text-heading-4 font-semibold text-text-primary mb-2">Listing prepared</h3>
          <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
            Your property details have been prepared.
            {mode === 'agent'
              ? ' Connect a backend to publish this listing to the platform.'
              : ' Once the backend is connected, your listing will be submitted for review.'}
          </p>
        </div>
        <button type="button" onClick={() => { setSubmitted(false); setForm(EMPTY_FORM); setImageNames([]) }} className="btn-secondary">
          Submit another property
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">

      {/* Section 1: Basic info */}
      <FormSection title="Basic information" step={1}>
        <FormField
          id="prop-title"
          label="Property title"
          required
          placeholder="e.g. Modern 3 Bedroom Apartment in East Legon"
          value={form.title}
          onChange={setField('title')}
          error={errors.title}
        />
        <FormTextarea
          id="prop-desc"
          label="Description"
          required
          placeholder="Describe the property in detail — location benefits, condition, standout features…"
          rows={5}
          value={form.description}
          onChange={setField('description')}
          error={errors.description}
          hint="Minimum 30 characters. Good descriptions attract more serious enquiries."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormSelect
            id="prop-type"
            label="Property type"
            required
            placeholder="Select type…"
            options={PROPERTY_TYPES}
            value={form.propertyType}
            onChange={setField('propertyType')}
            error={errors.propertyType}
          />
          <FormSelect
            id="prop-transaction"
            label="Transaction type"
            required
            placeholder="For sale or rent?"
            options={TRANSACTION_TYPES}
            value={form.transactionType}
            onChange={setField('transactionType')}
            error={errors.transactionType}
          />
        </div>
      </FormSection>

      {/* Section 2: Pricing */}
      <FormSection title="Pricing" step={2}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="sm:col-span-2">
            <FormField
              id="prop-price"
              label="Price"
              required
              type="number"
              min="0"
              placeholder="e.g. 8500"
              value={form.price}
              onChange={setField('price')}
              error={errors.price}
              hint={form.transactionType === 'rent' ? 'Monthly rent amount' : 'Total asking price'}
            />
          </div>
          <FormSelect
            id="prop-currency"
            label="Currency"
            options={CURRENCIES}
            value={form.currency}
            onChange={setField('currency')}
          />
        </div>
      </FormSection>

      {/* Section 3: Location */}
      <FormSection title="Location" step={3}>
        <FormField
          id="prop-address"
          label="Street address"
          placeholder="e.g. 14 Osei Bonsu Close"
          value={form.address}
          onChange={setField('address')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            id="prop-neighborhood"
            label="Neighbourhood"
            placeholder="e.g. East Legon"
            value={form.neighborhood}
            onChange={setField('neighborhood')}
          />
          <FormField
            id="prop-city"
            label="City"
            required
            placeholder="e.g. Accra"
            value={form.city}
            onChange={setField('city')}
            error={errors.city}
          />
        </div>
        <FormSelect
          id="prop-region"
          label="Region"
          required
          placeholder="Select region…"
          options={REGIONS}
          value={form.region}
          onChange={setField('region')}
          error={errors.region}
        />
      </FormSection>

      {/* Section 4: Property details */}
      <FormSection title="Property details" step={4}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <FormSelect
            id="prop-beds"
            label="Bedrooms"
            options={BEDROOM_OPTS}
            value={form.bedrooms}
            onChange={setField('bedrooms')}
          />
          <FormSelect
            id="prop-baths"
            label="Bathrooms"
            options={BATHROOM_OPTS}
            value={form.bathrooms}
            onChange={setField('bathrooms')}
          />
          <FormSelect
            id="prop-parking"
            label="Parking spaces"
            options={PARKING_OPTS}
            value={form.parking}
            onChange={setField('parking')}
          />
          <FormField
            id="prop-area"
            label="Area (m²)"
            required
            type="number"
            min="1"
            placeholder="e.g. 185"
            value={form.area}
            onChange={setField('area')}
            error={errors.area}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormSelect
            id="prop-furnishing"
            label="Furnishing"
            placeholder="Select status…"
            options={FURNISHING_OPTIONS}
            value={form.furnishing}
            onChange={setField('furnishing')}
          />
          <FormSelect
            id="prop-availability"
            label="Availability"
            placeholder="When is it available?"
            options={AVAILABILITY_OPTIONS}
            value={form.availability}
            onChange={setField('availability')}
          />
        </div>
      </FormSection>

      {/* Section 5: Amenities */}
      <FormSection title="Features & amenities" step={5}>
        <FormCheckboxGroup
          label="Select all that apply"
          options={AMENITY_OPTIONS}
          selected={form.amenities}
          onChange={setAmenities}
          columns={3}
        />
      </FormSection>

      {/* Section 6: Images */}
      <FormSection title="Property images" step={6}>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="prop-images"
            className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border
                       rounded-xl p-8 cursor-pointer hover:border-accent/40 hover:bg-accent/3 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-secondary flex items-center justify-center">
              <Upload size={20} className="text-text-secondary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-text-primary">Click to upload images</p>
              <p className="text-xs text-text-secondary mt-1">PNG, JPG up to 10MB each. Minimum 1, maximum 10 images.</p>
            </div>
            <input
              id="prop-images"
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={handleImages}
            />
          </label>

          {imageNames.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {imageNames.map((name) => (
                <div key={name} className="flex items-center gap-2 bg-surface-secondary rounded-lg px-3 py-1.5">
                  <span className="text-xs text-text-secondary truncate max-w-[160px]">{name}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(name)}
                    aria-label={`Remove ${name}`}
                    className="text-text-secondary hover:text-red-500 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </FormSection>

      {/* Submit row */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary py-3 px-8 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading
            ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : null}
          {loading
            ? 'Submitting…'
            : mode === 'agent' ? 'Publish listing' : 'Submit for review'}
        </button>
        <button
          type="button"
          onClick={handleSaveDraft}
          className="btn-secondary py-3 px-8"
        >
          Save draft
        </button>
      </div>

      <p className="text-[10px] text-text-secondary/50">
        Submissions are frontend-only. No data will be stored until a backend is connected.
      </p>
    </form>
  )
}

// ── Section wrapper ────────────────────────────────────────────────────────────
function FormSection({ title, step, children }: { title: string; step: number; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-border p-6 md:p-8 flex flex-col gap-5">
      <div className="flex items-center gap-3 pb-2 border-b border-border">
        <span className="w-7 h-7 rounded-full bg-text-primary text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
          {step}
        </span>
        <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
      </div>
      {children}
    </section>
  )
}
