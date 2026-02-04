# Google Sheets Setup for MechVault

Follow these steps to configure Google Sheets as your backend for MechVault.

## 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one

## 2. Enable Google Sheets API

1. In your Google Cloud project, navigate to **APIs & Services** > **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

## 3. Create a Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the details:
   - Name: `MechVault Service Account` (or any name you prefer)
   - Click **Create and Continue**
4. Grant the service account the **Editor** role (or **Viewer** if you only need read access)
5. Click **Done**

## 4. Create and Download Private Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create New Key**
4. Select **JSON** as the key type
5. Click **Create** - this will download a JSON file

## 5. Extract Credentials from JSON File

Open the downloaded JSON file. You'll need these values:

- `client_email` → Set as `GOOGLE_SERVICE_ACCOUNT_EMAIL` in `.env.local`
- `private_key` → Set as `GOOGLE_PRIVATE_KEY` in `.env.local` (keep the `\n` characters)

## 6. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Copy the **Sheet ID** from the URL (the long string between `/d/` and `/edit`)
4. Set it as `GOOGLE_SHEET_ID` in `.env.local`

## 7. Set Up Your Sheet Structure

In your first sheet (tab), use these column headers in the first row:

| Column Header | Description | Required |
|--------------|-------------|----------|
| `id` | Unique product identifier (e.g., PROD001) | Yes |
| `title` | Product name | Yes |
| `category` | Category (e.g., CAD Library, 3D Print) | Yes |
| `price` | Display price (e.g., 99.99) | Yes |
| `original_price` | Original price for discounts (e.g., 149.99) | No |
| `description` | Product description (Markdown supported) | Yes |
| `images` | Comma-separated image URLs | No |
| `tags` | Comma-separated tags (e.g., SolidWorks, ISO, Bolt) | No |
| `link_shopee` | Shopee purchase link | No |
| `link_whatsapp` | WhatsApp order link | No |
| `badge` | Badge text (e.g., Best Seller, New, Hot) | No |
| `is_active` | TRUE/FALSE to hide/show product | No |

### Example Sheet Data:

```
id,title,category,price,original_price,description,images,tags,link_shopee,link_whatsapp,badge,is_active
PROD001,Mechanical Gear Assembly,CAD Library,99.99,149.99,"Premium quality gear assembly for mechanical projects\n\n**Features:**\n- High precision\n- Easy to assemble",https://example.com/image1.jpg,https://example.com/image2.jpg,SolidWorks,ISO,Mechanical,https://shopee.com/...,https://wa.me/...,Best Seller,TRUE
PROD002,3D Printer Model,3D Print,49.99,,"Complete 3D printer model files\n\nIncludes:\n- STL files\n- Assembly instructions",https://example.com/image3.jpg,3D Print,DIY,https://shopee.com/...,,New,TRUE
```

## 8. Share Sheet with Service Account

1. In your Google Sheet, click **Share**
2. Enter the `client_email` from your service account
3. Give it **Editor** permission
4. Click **Send**

## 9. Set Environment Variables

Create a `.env.local` file in your project root:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id-here
```

## 10. Restart Your Development Server

After setting up the environment variables, restart your development server:

```bash
bun run dev
```

## Important Notes

- **Security:** Never commit `.env.local` to version control
- **Rate Limits:** The API uses ISR with 60-second revalidation to avoid rate limits
- **Image URLs:** Use publicly accessible URLs for product images
- **Markdown:** You can use Markdown formatting in the `description` field

## Testing

You can test your setup by visiting:

- Home page: `http://localhost:3000`
- Marketplace: `http://localhost:3000/market`
- API endpoints:
  - `http://localhost:3000/api/products`
  - `http://localhost:3000/api/products?id=PROD001`
  - `http://localhost:3000/api/categories`

## Troubleshooting

**Issue:** "No sheet found in the document"
- **Solution:** Make sure you've shared the sheet with your service account email

**Issue:** "Failed to fetch products"
- **Solution:** Check that your `GOOGLE_PRIVATE_KEY` has proper formatting with `\n` characters

**Issue:** Images not loading
- **Solution:** Ensure image URLs are publicly accessible

**Issue:** Products not showing
- **Solution:** Check that `is_active` is set to TRUE for products you want to display
