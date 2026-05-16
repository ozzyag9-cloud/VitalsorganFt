import React from 'react';
import { Bluetooth, Camera, CheckCircle2, Compass, Cpu, Mic, MonitorSmartphone, ShieldAlert, Smartphone, Wifi } from 'lucide-react';

type HardwareStatus = 'idle' | 'requesting' | 'granted' | 'blocked' | 'unsupported';

type HardwareProbe = {
  id: string;
  label: string;
  description: string;
  status: HardwareStatus;
  detail: string;
  icon: React.ElementType;
};

const initialProbes: HardwareProbe[] = [
  { id: 'camera', label: 'Camera', description: 'Request browser camera stream for VitalOS imaging apps.', status: 'idle', detail: 'Awaiting permission', icon: Camera },
  { id: 'microphone', label: 'Microphone', description: 'Request browser microphone stream for voice and breath apps.', status: 'idle', detail: 'Awaiting permission', icon: Mic },
  { id: 'location', label: 'Location / GNSS', description: 'Request geolocation for maps, safety reminders, and local automations.', status: 'idle', detail: 'Awaiting permission', icon: Compass },
  { id: 'bluetooth', label: 'Bluetooth', description: 'Probe Web Bluetooth support for wearables and local devices.', status: 'idle', detail: 'Awaiting permission', icon: Bluetooth },
  { id: 'motion', label: 'Motion Sensors', description: 'Probe device motion/orientation availability for activity apps.', status: 'idle', detail: 'Awaiting permission', icon: Smartphone },
];

const statusClass: Record<HardwareStatus, string> = {
  idle: 'bg-white/[0.03] border-white/10 text-slate-400',
  requesting: 'bg-amber-500/10 border-amber-500/20 text-amber-200',
  granted: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200',
  blocked: 'bg-rose-500/10 border-rose-500/20 text-rose-200',
  unsupported: 'bg-slate-500/10 border-slate-500/20 text-slate-300',
};

export function VitalOSHardwareAccess() {
  const [probes, setProbes] = React.useState(initialProbes);
  const [previewStream, setPreviewStream] = React.useState<MediaStream | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  React.useEffect(() => {
    return () => {
      previewStream?.getTracks().forEach((track) => track.stop());
    };
  }, [previewStream]);

  const updateProbe = (id: string, status: HardwareStatus, detail: string) => {
    setProbes((current) => current.map((probe) => probe.id === id ? { ...probe, status, detail } : probe));
  };

  const requestCamera = async () => {
    updateProbe('camera', 'requesting', 'Opening camera prompt...');
    if (!navigator.mediaDevices?.getUserMedia) {
      updateProbe('camera', 'unsupported', 'MediaDevices API unavailable in this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      previewStream?.getTracks().forEach((track) => track.stop());
      setPreviewStream(stream);
      updateProbe('camera', 'granted', 'Camera stream active in local preview.');
    } catch (error) {
      updateProbe('camera', 'blocked', error instanceof Error ? error.message : 'Camera permission denied.');
    }
  };

  const requestMicrophone = async () => {
    updateProbe('microphone', 'requesting', 'Opening microphone prompt...');
    if (!navigator.mediaDevices?.getUserMedia) {
      updateProbe('microphone', 'unsupported', 'MediaDevices API unavailable in this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      updateProbe('microphone', 'granted', 'Microphone permission granted and released.');
    } catch (error) {
      updateProbe('microphone', 'blocked', error instanceof Error ? error.message : 'Microphone permission denied.');
    }
  };

  const requestLocation = async () => {
    updateProbe('location', 'requesting', 'Opening location prompt...');
    if (!navigator.geolocation) {
      updateProbe('location', 'unsupported', 'Geolocation API unavailable in this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => updateProbe('location', 'granted', `Approx ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)} • ±${Math.round(position.coords.accuracy)}m`),
      (error) => updateProbe('location', 'blocked', error.message),
      { enableHighAccuracy: true, timeout: 12000 }
    );
  };

  const requestBluetooth = async () => {
    updateProbe('bluetooth', 'requesting', 'Opening Bluetooth chooser...');
    const bluetooth = (navigator as any).bluetooth;
    if (!bluetooth?.requestDevice) {
      updateProbe('bluetooth', 'unsupported', 'Web Bluetooth is unavailable in this browser/device.');
      return;
    }

    try {
      const device = await bluetooth.requestDevice({ acceptAllDevices: true, optionalServices: [] });
      updateProbe('bluetooth', 'granted', `Selected ${device.name || device.id || 'Bluetooth device'}.`);
    } catch (error) {
      updateProbe('bluetooth', 'blocked', error instanceof Error ? error.message : 'Bluetooth permission cancelled.');
    }
  };

  const requestMotion = async () => {
    updateProbe('motion', 'requesting', 'Checking motion sensor access...');
    const motionEvent = DeviceMotionEvent as any;

    try {
      if (typeof motionEvent?.requestPermission === 'function') {
        const permission = await motionEvent.requestPermission();
        updateProbe('motion', permission === 'granted' ? 'granted' : 'blocked', `iOS motion permission: ${permission}.`);
        return;
      }

      if ('DeviceMotionEvent' in window || 'DeviceOrientationEvent' in window) {
        updateProbe('motion', 'granted', 'Motion/orientation events appear available for runtime listeners.');
      } else {
        updateProbe('motion', 'unsupported', 'Motion sensor events unavailable in this browser.');
      }
    } catch (error) {
      updateProbe('motion', 'blocked', error instanceof Error ? error.message : 'Motion permission denied.');
    }
  };

  const requestHandlers: Record<string, () => Promise<void> | void> = {
    camera: requestCamera,
    microphone: requestMicrophone,
    location: requestLocation,
    bluetooth: requestBluetooth,
    motion: requestMotion,
  };

  return (
    <section className="vitalos-window p-5 md:p-7 space-y-6" id="vitalos-hardware">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200">
            <MonitorSmartphone className="h-3.5 w-3.5" />
            AWS-hosted web hardware bridge
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter text-white">Device access console</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-400">
            This is the practical AWS/PWA layer: hardware access runs on the user&apos;s device through secure browser APIs over HTTPS. AWS hosts the control plane; the phone still prompts the owner before exposing protected sensors.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-xs leading-relaxed text-amber-100 max-w-xl">
          <ShieldAlert className="mb-2 h-5 w-5" />
          Full kernel/HAL control requires a native OS image on the phone. This panel gives VitalOS real browser-approved camera, mic, location, Bluetooth, and motion probes today.
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {probes.map((probe) => (
            <div key={probe.id} className="rounded-3xl border border-white/10 bg-black/30 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                    <probe.icon className="h-5 w-5 text-cyan-200" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-white">{probe.label}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{probe.description}</p>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full border px-2 py-1 text-[8px] font-black uppercase tracking-widest ${statusClass[probe.status]}`}>{probe.status}</span>
              </div>
              <p className="mt-4 rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-[10px] leading-relaxed text-slate-400">{probe.detail}</p>
              <button
                onClick={() => requestHandlers[probe.id]?.()}
                disabled={probe.status === 'requesting'}
                className="mt-4 w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-cyan-100 transition hover:bg-cyan-300/20 disabled:opacity-50"
              >
                Request Access
              </button>
            </div>
          ))}
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-4 space-y-4">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            <span>Local Preview</span>
            <Wifi className="h-4 w-4 text-cyan-200" />
          </div>
          <div className="aspect-[9/16] overflow-hidden rounded-[28px] border border-white/10 bg-black flex items-center justify-center">
            {previewStream ? (
              <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover" />
            ) : (
              <div className="space-y-4 text-center px-8">
                <Cpu className="mx-auto h-12 w-12 text-cyan-200/70" strokeWidth={1.5} />
                <p className="text-xs leading-relaxed text-slate-500">Grant camera access to show a live local preview. The stream stays in this browser session.</p>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              previewStream?.getTracks().forEach((track) => track.stop());
              setPreviewStream(null);
              updateProbe('camera', 'idle', 'Camera stream stopped.');
            }}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-slate-300 hover:bg-white/[0.06]"
          >
            Stop Local Stream
          </button>
        </div>
      </div>
    </section>
  );
}
