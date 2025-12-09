import { useState } from 'react';
import {
  Cpu,
  Download,
  HardDrive,
  Search,
  AlertCircle,
  CheckCircle2,
  Terminal,
  Server,
  Monitor,
  Wifi,
  Filter,
} from 'lucide-react';
import { Button } from '../components/ui/button';

const DRIVERS_DATA = [
  {
    id: 'gpu-rtx',
    name: 'NVIDIA RTX Series Driver',
    version: '546.33',
    type: 'Graphics',
    os: 'Windows 11',
    size: '680 MB',
    status: 'Stable',
    date: '2023-12-15',
    icon: <Monitor className="h-5 w-5 text-green-400" />,
  },
  {
    id: 'chipset-amd',
    name: 'AMD Ryzen Chipset Drivers',
    version: '5.11.02.217',
    type: 'Chipset',
    os: 'Windows 10/11',
    size: '54 MB',
    status: 'Beta',
    date: '2023-11-20',
    icon: <Cpu className="h-5 w-5 text-red-400" />,
  },
  {
    id: 'audio-realtek',
    name: 'Realtek High Definition Audio',
    version: '6.0.9605.1',
    type: 'Audio',
    os: 'Windows 11',
    size: '245 MB',
    status: 'Stable',
    date: '2023-10-05',
    icon: <Server className="h-5 w-5 text-blue-400" />,
  },
  {
    id: 'lan-intel',
    name: 'Intel Ethernet Adapter Complete Pack',
    version: '28.2',
    type: 'Network',
    os: 'Multi-OS',
    size: '820 MB',
    status: 'LTS',
    date: '2023-09-12',
    icon: <Wifi className="h-5 w-5 text-cyan-400" />,
  },
  {
    id: 'bios-sys',
    name: 'System BIOS Update F14',
    version: 'F14a',
    type: 'Firmware',
    os: 'BIOS',
    size: '12 MB',
    status: 'Critical',
    date: '2024-01-05',
    icon: <HardDrive className="h-5 w-5 text-amber-400" />,
  },
];

export function ControladoresPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOS, setSelectedOS] = useState('All');

  return (
    <div className="min-h-screen bg-[#0D0D10] text-[#E0E0E0] font-mono">
      {/* Top Banner - Warning/Info Style */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-xs text-amber-500 flex items-center justify-center gap-2">
        <AlertCircle size={14} />
        <span>ENSURE SYSTEM COMPATIBILITY BEFORE FLASHING FIRMWARE.</span>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                <Terminal className="text-gray-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">DRIVERS & FIRMWARE</h1>
                <p className="text-xs text-gray-500">OFFICIAL REPOSITORY // INDEX V.3.0</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-6 text-xs text-gray-500 border border-white/5 rounded-lg p-3 bg-black/20">
            <div className="text-center">
              <div className="text-emerald-500 font-bold mb-0.5">ONLINE</div>
              <div>System Status</div>
            </div>
            <div className="w-px bg-white/10"></div>
            <div className="text-center">
              <div className="text-white font-bold mb-0.5">5.2TB</div>
              <div>Total Bandwidth</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#15151A] border border-white/5 rounded-t-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by hardware ID or name..."
              className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:text-white transition-colors placeholder:text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Filter size={14} className="text-gray-500" />
            {['All', 'Windows 11', 'Windows 10', 'Linux', 'BIOS'].map((os) => (
              <button
                key={os}
                onClick={() => setSelectedOS(os)}
                className={`
                  px-3 py-1.5 rounded text-xs font-medium border transition-colors whitespace-nowrap
                  ${
                    selectedOS === os
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-transparent border-transparent text-gray-500 hover:text-gray-300'
                  }
                `}
              >
                {os}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#15151A] border border-white/5 border-t-0 rounded-b-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0A0A0D] text-gray-500 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Device Name</th>
                  <th className="px-6 py-4 font-medium">Version</th>
                  <th className="px-6 py-4 font-medium">OS</th>
                  <th className="px-6 py-4 font-medium">Size</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Updated</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {DRIVERS_DATA.map((driver) => (
                  <tr key={driver.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-black/40 rounded border border-white/5 group-hover:border-white/20 transition-colors">
                          {driver.icon}
                        </div>
                        <div>
                          <div className="font-bold text-gray-200">{driver.name}</div>
                          <div className="text-xs text-gray-600">{driver.id.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-400">{driver.version}</td>
                    <td className="px-6 py-4 text-gray-400">{driver.os}</td>
                    <td className="px-6 py-4 text-gray-500">{driver.size}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`
                        inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border
                        ${
                          driver.status === 'Stable'
                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                            : driver.status === 'Beta'
                              ? 'bg-red-500/10 text-red-500 border-red-500/20'
                              : driver.status === 'Critical'
                                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                        }
                      `}
                      >
                        {driver.status === 'Stable' && <CheckCircle2 size={10} className="mr-1" />}
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{driver.date}</td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/30 h-8"
                      >
                        <Download size={14} className="mr-2" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="bg-[#0A0A0D] p-4 text-center border-t border-white/5 text-xs text-gray-600">
            Showing 5 of 128 available drivers
          </div>
        </div>
      </div>
    </div>
  );
}
