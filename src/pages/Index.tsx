import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const themes = [
  { id: 1, name: 'Sakura Dream', colors: ['#ffb7d5', '#fff0f6'], emoji: '🌸' },
  { id: 2, name: 'Ocean Blue', colors: ['#93c5fd', '#dbeafe'], emoji: '🌊' },
  { id: 3, name: 'Sunset Orange', colors: ['#fdba74', '#fed7aa'], emoji: '🌅' },
  { id: 4, name: 'Neon Purple', colors: ['#c084fc', '#e9d5ff'], emoji: '💜' },
  { id: 5, name: 'Mint Fresh', colors: ['#86efac', '#dcfce7'], emoji: '🍃' },
  { id: 6, name: 'Lavender Sky', colors: ['#d8b4fe', '#f3e8ff'], emoji: '🦋' },
  { id: 7, name: 'Coral Reef', colors: ['#fb923c', '#ffedd5'], emoji: '🪸' },
  { id: 8, name: 'Night City', colors: ['#818cf8', '#312e81'], emoji: '🌃' },
  { id: 9, name: 'Cherry Blossom', colors: ['#f9a8d4', '#fce7f3'], emoji: '🌺' },
  { id: 10, name: 'Electric Teal', colors: ['#2dd4bf', '#99f6e4'], emoji: '⚡' },
];

export default function Index() {
  const [cpuTemp, setCpuTemp] = useState(48);
  const [cpuFreq, setCpuFreq] = useState(4591);
  const [cpuLoad, setCpuLoad] = useState(4);
  const [selectedTheme, setSelectedTheme] = useState(1);
  const [brightness, setBrightness] = useState([80]);
  const [rotation, setRotation] = useState('0');
  const [refreshRate, setRefreshRate] = useState('60');
  const [time, setTime] = useState(new Date());
  
  const [widgetSettings, setWidgetSettings] = useState({
    clockSize: 100,
    dateSize: 100,
    cpuInfoSize: 100,
    fontFamily: 'Rubik',
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const cpuInterval = setInterval(() => {
      setCpuTemp(prev => Math.max(35, Math.min(85, prev + (Math.random() - 0.5) * 3)));
      setCpuFreq(prev => Math.max(3500, Math.min(5200, prev + (Math.random() - 0.5) * 200)));
      setCpuLoad(prev => Math.max(1, Math.min(100, prev + (Math.random() - 0.5) * 10)));
    }, 2000);
    
    return () => {
      clearInterval(timer);
      clearInterval(cpuInterval);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
  };

  const getDayOfWeek = (date: Date) => {
    const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[date.getDay()];
  };

  return (
    <div className="min-h-screen bg-background p-6 dark">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center border border-border">
              <Icon name="Thermometer" className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary tracking-tight">TRCC</h1>
              <p className="text-sm text-muted-foreground">Thermalright Control Centre</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Icon name="HelpCircle" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="X" size={20} />
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-4 border-border bg-card animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Monitor" className="text-primary" size={20} />
                <h2 className="font-semibold text-foreground">Устройство</h2>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary/20">
                FROZEN WARFRAME SE
              </Button>
            </Card>

            <Card className="p-6 border-border bg-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div 
                className="relative w-full aspect-[3/2] rounded-lg overflow-hidden border-4 border-muted shadow-lg"
                style={{ 
                  background: `linear-gradient(to bottom, ${themes[selectedTheme - 1].colors[0]}, ${themes[selectedTheme - 1].colors[1]})`,
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4" style={{ fontFamily: widgetSettings.fontFamily }}>
                  <div 
                    className="font-bold text-gray-700 mb-2 transition-all"
                    style={{ fontSize: `${(widgetSettings.clockSize / 100) * 3}rem` }}
                  >
                    {formatTime(time)}
                  </div>
                  <div 
                    className="text-gray-600 mb-4 transition-all"
                    style={{ fontSize: `${(widgetSettings.dateSize / 100) * 1.125}rem` }}
                  >
                    {formatDate(time)} {getDayOfWeek(time)}
                  </div>
                  <div className="w-full mt-2 pt-4 border-t-2 border-gray-400">
                    <div 
                      className="text-gray-600 mb-1 transition-all"
                      style={{ fontSize: `${(widgetSettings.cpuInfoSize / 100) * 0.875}rem` }}
                    >
                      CPU
                    </div>
                    <div 
                      className="font-semibold text-gray-700 transition-all"
                      style={{ fontSize: `${(widgetSettings.cpuInfoSize / 100) * 1.5}rem` }}
                    >
                      {Math.round(cpuTemp)}°C {Math.round(cpuLoad)}% {Math.round(cpuFreq)}MHz
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="monitor" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6 bg-card border border-border">
                <TabsTrigger value="monitor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Activity" size={16} className="mr-2" />
                  Мониторинг
                </TabsTrigger>
                <TabsTrigger value="themes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Palette" size={16} className="mr-2" />
                  Темы
                </TabsTrigger>
                <TabsTrigger value="widgets" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Layout" size={16} className="mr-2" />
                  Виджеты
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Настройки
                </TabsTrigger>
              </TabsList>

              <TabsContent value="monitor" className="space-y-4 animate-fade-in">
                <Card className="p-6 border-border bg-card">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon name="Cpu" className="text-primary" size={24} />
                    <h3 className="text-xl font-semibold">Процессор</h3>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Температура</div>
                      <div className="text-4xl font-bold text-primary animate-pulse-slow">
                        {Math.round(cpuTemp)}°C
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${(cpuTemp / 100) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Загрузка</div>
                      <div className="text-4xl font-bold text-primary animate-pulse-slow">
                        {Math.round(cpuLoad)}%
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${cpuLoad}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Частота</div>
                      <div className="text-4xl font-bold text-primary animate-pulse-slow">
                        {Math.round(cpuFreq)}
                      </div>
                      <div className="text-xs text-muted-foreground">МГц</div>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-6 border-border bg-card">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name="Droplets" className="text-blue-400" size={20} />
                      <h4 className="font-semibold">Помпа СЖО</h4>
                    </div>
                    <div className="text-2xl font-bold text-foreground">2400 об/мин</div>
                    <div className="text-sm text-muted-foreground mt-1">Нормальная работа</div>
                  </Card>

                  <Card className="p-6 border-border bg-card">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name="Fan" className="text-cyan-400" size={20} />
                      <h4 className="font-semibold">Вентиляторы</h4>
                    </div>
                    <div className="text-2xl font-bold text-foreground">1200 об/мин</div>
                    <div className="text-sm text-muted-foreground mt-1">3 активных</div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="themes" className="animate-fade-in">
                <Card className="p-6 border-border bg-card">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon name="Palette" className="text-primary" size={24} />
                    <h3 className="text-xl font-semibold">Цветовые схемы</h3>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4 mb-4">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`group relative aspect-[3/2] rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                          selectedTheme === theme.id ? 'border-primary ring-2 ring-primary/50' : 'border-border'
                        }`}
                        style={{ 
                          background: `linear-gradient(to bottom, ${theme.colors[0]}, ${theme.colors[1]})`,
                        }}
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                          <div className="text-2xl mb-1">{theme.emoji}</div>
                          <div className="text-xs font-semibold text-gray-700 mb-1">21:31</div>
                          <div className="text-[8px] text-gray-600">CPU 49°C</div>
                        </div>
                        {selectedTheme === theme.id && (
                          <div className="absolute top-1 right-1 bg-primary rounded-full p-1">
                            <Icon name="Check" size={12} className="text-primary-foreground" />
                          </div>
                        )}
                        <div className="absolute bottom-1 left-0 right-0 text-center">
                          <div className="text-[8px] font-medium text-gray-700 px-1 truncate">{theme.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-semibold mb-3">Текущая тема: {themes[selectedTheme - 1].name}</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Icon name="Upload" size={16} className="mr-2" />
                        Импорт
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Icon name="Download" size={16} className="mr-2" />
                        Экспорт
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="widgets" className="space-y-4 animate-fade-in">
                <Card className="p-6 border-border bg-card">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon name="Layout" className="text-primary" size={24} />
                    <h3 className="text-xl font-semibold">Настройка виджетов</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-3 block">Размер часов</label>
                      <div className="flex items-center gap-4">
                        <Icon name="Clock" size={20} className="text-muted-foreground" />
                        <Slider
                          value={[widgetSettings.clockSize]}
                          onValueChange={(val) => setWidgetSettings(prev => ({ ...prev, clockSize: val[0] }))}
                          min={50}
                          max={150}
                          step={5}
                          className="flex-1"
                        />
                        <span className="text-sm font-semibold w-12 text-right">{widgetSettings.clockSize}%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-3 block">Размер даты</label>
                      <div className="flex items-center gap-4">
                        <Icon name="Calendar" size={20} className="text-muted-foreground" />
                        <Slider
                          value={[widgetSettings.dateSize]}
                          onValueChange={(val) => setWidgetSettings(prev => ({ ...prev, dateSize: val[0] }))}
                          min={50}
                          max={150}
                          step={5}
                          className="flex-1"
                        />
                        <span className="text-sm font-semibold w-12 text-right">{widgetSettings.dateSize}%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-3 block">Размер информации CPU</label>
                      <div className="flex items-center gap-4">
                        <Icon name="Cpu" size={20} className="text-muted-foreground" />
                        <Slider
                          value={[widgetSettings.cpuInfoSize]}
                          onValueChange={(val) => setWidgetSettings(prev => ({ ...prev, cpuInfoSize: val[0] }))}
                          min={50}
                          max={150}
                          step={5}
                          className="flex-1"
                        />
                        <span className="text-sm font-semibold w-12 text-right">{widgetSettings.cpuInfoSize}%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-3 block">Шрифт виджетов</label>
                      <Select 
                        value={widgetSettings.fontFamily} 
                        onValueChange={(val) => setWidgetSettings(prev => ({ ...prev, fontFamily: val }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Rubik">Rubik (по умолчанию)</SelectItem>
                          <SelectItem value="Roboto">Roboto</SelectItem>
                          <SelectItem value="Open Sans">Open Sans</SelectItem>
                          <SelectItem value="Montserrat">Montserrat</SelectItem>
                          <SelectItem value="Oswald">Oswald</SelectItem>
                          <SelectItem value="monospace">Monospace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button 
                        variant="outline"
                        onClick={() => setWidgetSettings({ clockSize: 100, dateSize: 100, cpuInfoSize: 100, fontFamily: 'Rubik' })}
                        className="w-full"
                      >
                        <Icon name="RotateCcw" size={16} className="mr-2" />
                        Сбросить настройки
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4 animate-fade-in">
                <Card className="p-6 border-border bg-card">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon name="Settings" className="text-primary" size={24} />
                    <h3 className="text-xl font-semibold">Параметры дисплея</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-3 block">Яркость экрана</label>
                      <div className="flex items-center gap-4">
                        <Icon name="Sun" size={20} className="text-muted-foreground" />
                        <Slider
                          value={brightness}
                          onValueChange={setBrightness}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm font-semibold w-12 text-right">{brightness[0]}%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-3 block">Поворот экрана</label>
                      <Select value={rotation} onValueChange={setRotation}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0° (по умолчанию)</SelectItem>
                          <SelectItem value="90">90° (поворот вправо)</SelectItem>
                          <SelectItem value="180">180° (вверх ногами)</SelectItem>
                          <SelectItem value="270">270° (поворот влево)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-3 block">Частота обновления</label>
                      <Select value={refreshRate} onValueChange={setRefreshRate}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 Гц</SelectItem>
                          <SelectItem value="60">60 Гц (рекомендуется)</SelectItem>
                          <SelectItem value="120">120 Гц</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <Icon name="Save" size={16} className="mr-2" />
                        Применить настройки
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-border bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="Info" className="text-primary" size={20} />
                    <h4 className="font-semibold">Информация об устройстве</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Модель:</span>
                      <span className="font-medium">Frozen Warframe 360 SE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Подключение:</span>
                      <span className="font-medium">USB 2.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Версия ПО:</span>
                      <span className="font-medium">1.0.0</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}