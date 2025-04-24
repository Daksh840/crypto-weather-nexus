import Image from 'next/image';

export default function CurrentWeather({
    temp,
    humidity,
    description,
    icon
  }: {
    temp: number;
    humidity: number;
    description: string;
    icon: string;
  }) {
    return (
      <>
        <Image
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          width={80}
          height={80}
          className="w-20 h-20"
        />
        <div>
          <p className="text-4xl font-bold">{Math.round(temp)}°C</p>
          <p className="text-gray-600 capitalize">{description}</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <p className="text-xl font-semibold">{humidity}%</p>
        </div>
      </>
    );
  }