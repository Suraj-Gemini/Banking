
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Enter valid phone'),
  dob: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(5, 'Address is required'),
  loanType: z.enum(['Home','Personal','Auto','Education']),
  amount: z.number().positive('Amount > 0'),
  tenure: z.number().int().positive('Tenure > 0'),
  income: z.number().positive('Income > 0'),
  aadhar: z.any().optional(),
  pan: z.any().optional(),
})

const LS_KEY = 'loan-progress-v1'

export default function LoanForm(){
  const saved = useMemo(()=>{ try{ return JSON.parse(localStorage.getItem(LS_KEY)||'null') }catch{ return null } }, [])

  const { register, handleSubmit, watch, setValue, formState:{ errors }, trigger, getValues } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: saved || {
      fullName:'', email:'', phone:'', dob:'', address:'', loanType:'Personal', amount: 100000, tenure: 12, income: 800000,
    }
  })

  const [step, setStep] = useState(saved?.__step || 1)

  // Persist to localStorage
  const all = watch()
  useEffect(()=>{
    const v = { ...getValues(), __step: step }
    localStorage.setItem(LS_KEY, JSON.stringify(v))
  }, [all, step])

  const progress = (step-1) * 33 + 1 // simple

  const onNext = async()=>{
    // validate current step fields before moving next
    if(step===1){
      const ok = await trigger(['fullName','email','phone','dob','address'])
      if(!ok) return
    }
    if(step===2){
      const ok = await trigger(['loanType','amount','tenure','income'])
      if(!ok) return
    }
    setStep(s=>Math.min(4, s+1))
  }
  const onPrev = ()=> setStep(s=>Math.max(1, s-1))

  const onSubmit = (data)=>{
    alert('Application submitted!' + JSON.stringify({ ...data, aadhar: data.aadhar?.[0]?.name, pan: data.pan?.[0]?.name }, null, 2))
    localStorage.removeItem(LS_KEY)
    window.location.reload()
  }

  return (
    <div className="card">
      <h2 style={{marginTop:0}}>Loan Application</h2>
      <div className="progress" aria-label="Form completion">
        <span style={{ width: `${progress}%` }}></span>
      </div>
      <p className="small">Step {step} of 4</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step===1 && (
          <div className="grid cols-2">
            <div className="field"><label>Full Name</label><input {...register('fullName')} /><span className="small" style={{color:'var(--bad)'}}>{errors.fullName?.message}</span></div>
            <div className="field"><label>Email</label><input type="email" {...register('email')} /><span className="small" style={{color:'var(--bad)'}}>{errors.email?.message}</span></div>
            <div className="field"><label>Phone</label><input {...register('phone')} /><span className="small" style={{color:'var(--bad)'}}>{errors.phone?.message}</span></div>
            <div className="field"><label>Date of Birth</label><input type="date" {...register('dob')} /><span className="small" style={{color:'var(--bad)'}}>{errors.dob?.message}</span></div>
            <div className="field" style={{gridColumn:'1 / -1'}}><label>Address</label><textarea rows={3} {...register('address')} /><span className="small" style={{color:'var(--bad)'}}>{errors.address?.message}</span></div>
          </div>
        )}

        {step===2 && (
          <div className="grid cols-2">
            <div className="field"><label>Loan Type</label>
              <select {...register('loanType')}>
                <option>Home</option>
                <option>Personal</option>
                <option>Auto</option>
                <option>Education</option>
              </select>
            </div>
            <div className="field"><label>Amount (₹)</label><input type="number" step="1000" {...register('amount', { valueAsNumber:true })} /><span className="small" style={{color:'var(--bad)'}}>{errors.amount?.message}</span></div>
            <div className="field"><label>Tenure (months)</label><input type="number" {...register('tenure', { valueAsNumber:true })} /><span className="small" style={{color:'var(--bad)'}}>{errors.tenure?.message}</span></div>
            <div className="field"><label>Annual Income (₹)</label><input type="number" step="1000" {...register('income', { valueAsNumber:true })} /><span className="small" style={{color:'var(--bad)'}}>{errors.income?.message}</span></div>
          </div>
        )}

        {step===3 && (
          <div className="grid cols-2">
            <div className="field"><label>Upload Aadhar (mock)</label><input type="file" accept="image/*,application/pdf" {...register('aadhar')} /></div>
            <div className="field"><label>Upload PAN (mock)</label><input type="file" accept="image/*,application/pdf" {...register('pan')} /></div>
            <div className="small">Files are not uploaded; just previewed locally.</div>
          </div>
        )}

        {step===4 && (
          <div className="card" style={{background:'transparent', border:'1px dashed var(--border)'}}>
            <h3>Review</h3>
            <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify({ ...getValues(), aadhar: getValues().aadhar?.[0]?.name, pan: getValues().pan?.[0]?.name }, null, 2)}</pre>
          </div>
        )}

        <div className="row" style={{justifyContent:'space-between', marginTop: '1rem'}}>
          <button type="button" className="btn secondary" disabled={step===1} onClick={onPrev}>Back</button>
          {step<4 ? (
            <button type="button" className="btn" onClick={onNext}>Next</button>
          ) : (
            <button type="submit" className="btn">Submit</button>
          )}
        </div>
      </form>
    </div>
  )
}
