export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      calls: {
        Row: {
          call_id: string
          created_at: string | null
          customer_id: string
          event: string
          id: string
          metadata_json: Json | null
          restaurant_id: string
        }
        Insert: {
          call_id: string
          created_at?: string | null
          customer_id: string
          event: string
          id?: string
          metadata_json?: Json | null
          restaurant_id: string
        }
        Update: {
          call_id?: string
          created_at?: string | null
          customer_id?: string
          event?: string
          id?: string
          metadata_json?: Json | null
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calls_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calls_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          analysis_success_evaluation: string | null
          analysis_summary: string | null
          call_id: string
          conversation: string
          created_at: string | null
          customer_id: string
          duration_ms: number | null
          id: string
          recording_url: string | null
          restaurant_id: string
        }
        Insert: {
          analysis_success_evaluation?: string | null
          analysis_summary?: string | null
          call_id: string
          conversation: string
          created_at?: string | null
          customer_id: string
          duration_ms?: number | null
          id?: string
          recording_url?: string | null
          restaurant_id: string
        }
        Update: {
          analysis_success_evaluation?: string | null
          analysis_summary?: string | null
          call_id?: string
          conversation?: string
          created_at?: string | null
          customer_id?: string
          duration_ms?: number | null
          id?: string
          recording_url?: string | null
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          created_at: string | null
          id: string
          name: string
          phone: string
          restaurant_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          phone: string
          restaurant_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          phone?: string
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string
          created_at: string | null
          id: string
          question: string
          restaurant_id: string
          version: number
        }
        Insert: {
          answer: string
          created_at?: string | null
          id?: string
          question: string
          restaurant_id: string
          version: number
        }
        Update: {
          answer?: string
          created_at?: string | null
          id?: string
          question?: string
          restaurant_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "faqs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      gateway_clover_pos: {
        Row: {
          active: boolean | null
          authorization_header: string
          created_at: string
          id: string
          mid: string
          restaurant_id: string
        }
        Insert: {
          active?: boolean | null
          authorization_header: string
          created_at?: string
          id?: string
          mid: string
          restaurant_id: string
        }
        Update: {
          active?: boolean | null
          authorization_header?: string
          created_at?: string
          id?: string
          mid?: string
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gateway_clover_pos_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      gateway_clover_pos_order: {
        Row: {
          created_at: string
          id: string
          order_id: string
          pos_config_id: string
          pos_order_id: string
          print_status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          pos_config_id: string
          pos_order_id: string
          print_status: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          pos_config_id?: string
          pos_order_id?: string
          print_status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gateway_clover_pos_order_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gateway_clover_pos_order_pos_config_id_fkey"
            columns: ["pos_config_id"]
            isOneToOne: false
            referencedRelation: "gateway_clover_pos"
            referencedColumns: ["id"]
          },
        ]
      }
      menus: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          item_name: string
          price: number
          restaurant_id: string
          version: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          item_name: string
          price: number
          restaurant_id: string
          version: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          item_name?: string
          price?: number
          restaurant_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "menus_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      modifiers: {
        Row: {
          created_at: string | null
          id: string
          menu_id: string
          name: string
          options_json: Json
          version: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          menu_id: string
          name: string
          options_json: Json
          version: number
        }
        Update: {
          created_at?: string | null
          id?: string
          menu_id?: string
          name?: string
          options_json?: Json
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "modifiers_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "latest_menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "modifiers_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          call_id: string
          created_at: string | null
          customer_id: string
          id: string
          items_json: Json
          order_version: number
          restaurant_id: string
          special_instructions: string | null
          total_amount: number
        }
        Insert: {
          call_id: string
          created_at?: string | null
          customer_id: string
          id?: string
          items_json: Json
          order_version?: number
          restaurant_id: string
          special_instructions?: string | null
          total_amount: number
        }
        Update: {
          call_id?: string
          created_at?: string | null
          customer_id?: string
          id?: string
          items_json?: Json
          order_version?: number
          restaurant_id?: string
          special_instructions?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          active: boolean | null
          assistant_id: string
          assistant_name: string
          created_at: string | null
          id: string
          name: string
          pos_type: string
          timezone: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          assistant_id: string
          assistant_name: string
          created_at?: string | null
          id?: string
          name: string
          pos_type?: string
          timezone: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          assistant_id?: string
          assistant_name?: string
          created_at?: string | null
          id?: string
          name?: string
          pos_type?: string
          timezone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          business_id: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          business_id?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          business_id?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      latest_faqs: {
        Row: {
          answer: string | null
          created_at: string | null
          id: string | null
          question: string | null
          restaurant_id: string | null
          version: number | null
        }
        Relationships: [
          {
            foreignKeyName: "faqs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      latest_menu_items: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          item_name: string | null
          price: number | null
          restaurant_id: string | null
          version: number | null
        }
        Relationships: [
          {
            foreignKeyName: "menus_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      latest_modifiers: {
        Row: {
          created_at: string | null
          id: string | null
          menu_id: string | null
          name: string | null
          options_json: Json | null
          version: number | null
        }
        Relationships: [
          {
            foreignKeyName: "modifiers_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "latest_menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "modifiers_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
