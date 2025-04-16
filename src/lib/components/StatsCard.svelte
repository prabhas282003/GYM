<script>
    export let title;
    export let value;
    export let icon;
    export let color;
  </script>
  
  <div class="p-4 rounded-lg shadow {color} dark:bg-opacity-20">
    <div class="flex justify-between items-center">
      <div>
        <p class="text-sm font-medium">{title}</p>
        <p class="text-2xl font-bold">{value}</p>
      </div>
      <span class="text-3xl">{icon}</span>
    </div>
  </div>